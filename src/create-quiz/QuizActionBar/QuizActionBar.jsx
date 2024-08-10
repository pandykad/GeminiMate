import React, { useContext, useState } from 'react';
import { GeminiContext } from '../GeminiContext/GeminiContext';
import Slider from '../Slider/Slider';
import './bg.css'
import uploadFile from '@/lib/fileUploadUtil';
import { toast } from "sonner";


import { ScrollArea } from '@/components/ui/scroll-area';

const QuizActionBar = () => {
    const { sendPrompt, difficulty, setDifficulty, numberOfQuestions, setNumberOfQuestions, uploadedFile, setUploadedFile, uploadImage, topics } = useContext(GeminiContext);
    const [fileName, setFileName] = useState("No file selected (PDF accepted)")

    const handleFileChange = async (event) => {
        setUploadedFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    }

    const handleUpload = async () => {
        if (!uploadedFile) {
            console.log("Please select a File");
            toast("Please select a File");
            return;
        }

        await uploadImage();
    }

    return (
        <div className='min-h-full flex flex-col justify-evenly w-96 bg-moving-gradient p-5 shadow-md rounded-xl m-1'>
            <h2 className='mt-0 p-2 text-center text-white text-lg'>Upload your syllabus document:</h2>
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
            <button 
                className='py-2 cursor-pointer text-white bg-black mb-2 rounded-2xl text-center border-none hover:opacity-70' 
                onClick={handleUpload}
            >
                Upload
            </button>

            <h2 className='text-center text-slate-50 text-lg'>Topics</h2>
            
            <ScrollArea className="h-[30vh] rounded-md border p-4">
                {topics.map((topic, index) => (
                    <div 
                        key={topic} 
                        onClick={async () => await sendPrompt(topic, numberOfQuestions, difficulty)} 
                        className='p-2 cursor-pointer bg-white mb-2 rounded-2xl text-center hover:bg-black hover:text-white'
                    >
                        {topic}
                    </div>
                ))}
            </ScrollArea>

            

            <h3 className='mt-8 text-center text-white text-lg'>Adjust Difficulty</h3>
            <Slider min={1} max={10} step={1} value={difficulty} setValue={setDifficulty} />

            <h3 className='mt-8 text-center text-white text-lg'>Adjust number of questions</h3>
            <Slider min={1} max={10} step={1} value={numberOfQuestions} setValue={setNumberOfQuestions} />
        </div>
    )
}

export default QuizActionBar;
