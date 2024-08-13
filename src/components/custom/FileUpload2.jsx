import React, { useState } from "react";
import { Button } from "../ui/button";

function FileUpload2({ setFile, id, docText}) {
    const [fileName, setFileName] = useState("No file selected...")
    return (
        <>
           
            <h2 className='mt-0 p-2 text-center text-black text-lg'>{docText}</h2>
            <div className='relative mb-4'>
                <input 
                    id={id}
                    className='absolute inset-0 opacity-0 cursor-pointer' 
                    type="file" 
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                        setFileName(e.target.files[0].name)
                        console.log(e.target.files[0]);
                    }}                     
                    accept=".pdf" 
                />
                <label 
                    htmlFor='file-upload'
                    className=' w-full h-20 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-white flex items-center justify-center text-center text-gray-700 hover:bg-gray-100'
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
        </>
    );
}

export default FileUpload2;

