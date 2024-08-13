import React, { useState, useRef, useEffect } from 'react';
import { Markmap } from 'markmap-view';
import { Toolbar } from 'markmap-toolbar';
import { Transformer } from 'markmap-lib';
import FileUpload from '@/components/custom/FileUpload';
import { toast } from "sonner";
import uploadFile from '@/lib/fileUploadUtil';
import Loader from '@/components/custom/Loader';
import Hero from './hero';
import ScrollDown from './scrollDown';
import './bg.css'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const transformer = new Transformer();

export default function MarkmapHooks() {
  const [value, setValue] = useState(`# markmap\n\n- beautiful\n- useful\n- easy\n- interactive\n`);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file selected...");
  const [generateButtonClicked, setGenerateButtonClicked] = useState(false);
  const refSvg = useRef(null);
  const refMm = useRef(null);
  const refToolbar = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        setFile(file);
        setFileName(file.name);
    } else {
        setFileName("No file selected...");
    }
};

  useEffect(() => {
    if (refMm.current) return;
    const mm = Markmap.create(refSvg.current);
    refMm.current = mm;
    renderToolbar(refMm.current, refToolbar.current);
  }, [refSvg.current]);

  useEffect(() => {
    const mm = refMm.current;
    if (!mm) return;
    const { root } = transformer.transform(value);
    mm.setData(root);
    mm.fit();
  }, [value]);

  const renderToolbar = (mm, wrapper) => {
    while (wrapper?.firstChild) wrapper.firstChild.remove();
    if (mm && wrapper) {
      const toolbar = new Toolbar();
      toolbar.attach(mm);
      toolbar.register({
        id: 'Download',
        title: 'Click to download the mindmap',
        content: 'Download',
        onClick: handleDownloadSVG,
      });
      toolbar.setItems([...Toolbar.defaultItems, 'Download']);
      wrapper.append(toolbar.render());
    }
  };

  const handleDownloadSVG = () => {
    const svg = refSvg.current;
    if (!svg) return;
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svg);
    if (!svgString.includes('xmlns="http://www.w3.org/2000/svg"')) {
      svgString = svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Mindmap.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const onGenerateMindmapHandler = async () => {
    if (!file) {
      toast("Please select a file");
      return;
    }
    setGenerateButtonClicked(true);
    const uploadUrl = 'http://localhost:3000/api/generateMindmap';
    try {
      const result = await uploadFile(file, uploadUrl);
      if (result) {
        toast("Response received successfully from Gemini");
        setValue(result.substring(3, result.length - 3));
      }
    } catch (error) {
      toast("Error uploading file");
    } finally {
      setGenerateButtonClicked(false);
    }
  };

  return (
    <>
      <div className="h-[90vh] flex justify-center items-center">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[82vh] max-w-[95vw] rounded-lg"
        >
          <ResizablePanel defaultSize={30}>
            <div className="min-h-full flex flex-col justify-center rounded-xl p-6">
              {!generateButtonClicked ? (
                <>
                <h2 className='mt-0 pb-2 text-center text-black text-lg'>Upload your syllabus document:</h2>
                <div className='relative mb-4'>
                    <input 
                        id='file-upload' 
                        className='absolute inset-0 opacity-0 cursor-pointer' 
                        type="file" 
                        onChange={handleFileChange} 
                        accept=".pdf" 
                    />
                    <label 
                        htmlFor='file-upload'
                        className='gemini-gradient-border w-full h-20 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-white flex items-center justify-center text-center text-gray-700 hover:bg-gray-100'
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-11 h-11 mb-1 pr-1 text-gray-500"
                        viewBox="0 0 32 32"
                    >
                        <path
                            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                            data-original="#000000"
                        />
                        <path
                            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                            data-original="#000000"
                        />
                    </svg>
                        
                        <span className='text-sm font-medium'>{fileName}</span>
                    </label>
                </div>
                <button 
                    className='py-2 cursor-pointer text-white mb-2 rounded-full text-center gemini-gradient-topic hover:bg-gradient-to-r from-[#4b90ff] to-[#ff5546] hover:text-white transition-all duration-300' 
                    onClick={onGenerateMindmapHandler}
                >
                    Upload
                </button>
                </>
              ) : (
                <Loader />
              )}
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={70}>
            <div className="w-full h-full flex items-center justify-center p-6">
              <svg className="w-full h-[85vh] rounded-md gemini-gradient-box-border" ref={refSvg} />
              <div className="absolute bottom-1 right-1 px-3" ref={refToolbar}></div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
