import React, { useState } from "react";
import uploadFile from "@/lib/fileUploadUtil";
import { toast } from "sonner";
import FileUpload from "@/components/custom/FileUpload";
import { FlashcardArray } from "react-quizlet-flashcard";
import './wand-loader.css'
import { TypeAnimation } from 'react-type-animation';
import './bg.css'
import 'ldrs/ring'
import { helix } from 'ldrs'
import Loader from "@/components/custom/Loader";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

helix.register();

function CreateFlashCard() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file selected...");
  const [result, setResult] = useState(null);
  const [generateButtonClicked, setGenerateButtonClicked] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        setFile(file);
        setFileName(file.name);
    } else {
        setFileName("No file selected...");
    }
};

  const onGenerateFlashCardHandler = async () => {
    if (!file) {
      console.log("Please select a File");
      toast("Please select a File");
      return;
    }

    setGenerateButtonClicked(true);

    const uploadUrl = "http://localhost:3000/api/generateFlashcards";

    try {
      const result = await uploadFile(file, uploadUrl);
      if (result) {
        let start = result.indexOf("[");
        let end = result.indexOf("]");
        const resultArr = result.substring(start, end + 1);

        console.log(resultArr);
        setResult(JSON.parse(resultArr));
        toast("Response received successfully from Gemini");
      }
    } catch (error) {
      console.error("Error:", error);
      toast("Error uploading file");
    } finally {
      setGenerateButtonClicked(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[90vh] max-w-[95vw] rounded-lg"
        >
          <ResizablePanel defaultSize={30}>
            
            <div className="min-h-full flex flex-col justify-center rounded-xl p-6">
            <h2 className='mt-0 pb-2 text-center text-black text-lg'>Upload your topic document:</h2>
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
                className='px-2 py-2 cursor-pointer text-white mb-2 rounded-full text-center gemini-gradient-topic hover:bg-gradient-to-r from-[#4b90ff] to-[#ff5546] hover:text-white transition-all duration-300' 
                onClick={onGenerateFlashCardHandler}
            >
                Upload
            </button>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={70}>
            <div className="flex h-full items-center justify-center p-6">
              <div className="flex h-full w-full items-center rounded-3xl justify-center p-6 gemini-gradient-topic">
              {generateButtonClicked && result == null ? 
                <Loader />
                :
                (result && <FlashcardArray cards={result} />)
              }
              </div>
              
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}

export default CreateFlashCard;
