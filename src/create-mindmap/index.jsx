import React, { useState, useRef, useEffect } from 'react';
import { Markmap } from 'markmap-view';
import { Toolbar } from 'markmap-toolbar';
import { Transformer } from 'markmap-lib';
import FileUpload from '@/components/custom/FileUpload';
import { toast } from "sonner";
import uploadFile from '@/lib/fileUploadUtil';

const transformer = new Transformer();

const initValue = `# markmap

- beautiful
- useful
- easy
- interactive
`;

export default function MarkmapHooks() {
  const [value, setValue] = useState(initValue);
  const refSvg = useRef(null);
  const refMm = useRef(null);
  const refToolbar = useRef(null);
  const [file, setFile] = useState(null);

  function renderToolbar(mm, wrapper) {
    console.log("rendering Toolbar");
    while (wrapper?.firstChild) wrapper.firstChild.remove();
    if (mm && wrapper) {
      const toolbar = new Toolbar();
      toolbar.attach(mm);
      toolbar.register({
        id: 'Download',
        title: 'Click to show an alert',
        content: 'Download',
        onClick: () => handleDownloadSVG(),
      });
      toolbar.setItems([...Toolbar.defaultItems, 'Download']);
      wrapper.append(toolbar.render());
    }
  }

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
    console.log("SVG download triggered.");
  };

  useEffect(() => {
    if (refMm.current) return;
    const mm = Markmap.create(refSvg.current);
    console.log('create', refSvg.current);
    refMm.current = mm;
    renderToolbar(refMm.current, refToolbar.current);
  }, [refSvg.current]);

  useEffect(() => {
    const mm = refMm.current;
    if (!mm) return;
    const { root } = transformer.transform(value);
    mm.setData(root);
    mm.fit();
  }, [refMm.current, value]);

  const handleChange = (value) => {
    setValue(value);
  };

  const onGenerateMindmapHandler = async () => {
    if (!file) {
      console.log("Please select a File");
      toast("Please select a File");
      return;
    }

    const uploadUrl = 'http://localhost:3000/api/generateMindmap'; 

    try {
      const result = await uploadFile(file, uploadUrl);
      if (result) {
        toast("Response received successfully from Gemini");
        console.log(result.substring(3, result.length - 3));
        handleChange(result.substring(3, result.length - 3));
      }
    } catch (error) {
      console.error('Error:', error);
      toast("Error uploading file");
    }
  };

  return (
    <div className='flex flex-col items-center p-10 gap-5'>
      <div className='text-center'>
        <h1 className='text-5xl pt-10 pb-5'>
          Supercharge your learning with Mindmapping!
        </h1>
        <h1 className='text-xl pt-5 pb-5'>
          Generate mindmap from any informational content, right from ancient history to modern science! 📚
        </h1>
      </div>
      <FileUpload generateButton={"Create Mindmap!"} setFile={setFile} handler={onGenerateMindmapHandler} />
      <div className='flex-1 w-full flex justify-center items-center'>
        <div className='relative w-full h-full'>
          <svg className="w-full h-[80vh] outline outline-2 outline-offset-2 rounded-md outline-yellow-200" ref={refSvg} />
          <div className="absolute bottom-1 right-1" ref={refToolbar}></div>
        </div>
      </div>
    </div>
  );
}
