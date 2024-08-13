import React, { useState } from "react";
import { Button } from "../ui/button";

function FileUpload({ handler, setFile, generateButton }) {
    const [fileName, setFileName] = useState("No file selected...");

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFile(file);
            setFileName(file.name);
        } else {
            setFileName("No file selected...");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-2 w-auto">
            <label
                htmlFor="uploadFile1"
                className="bg-white text-white font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-100 border-solid mx-auto font-[sans-serif] px-5 rounded-xl bg-moving-gradient"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-11 mb-2 fill-white"
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
                Upload file
                <input
                    type="file"
                    accept=".pdf"
                    id="uploadFile1"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <p className="text-xs font-medium text-white mt-2">
                    PDFs are Allowed.
                </p>
            </label>

            <h3>{fileName}</h3>

            <div className="">
                <Button onClick={handler}>{generateButton}</Button>
            </div>
        </div>
    );
}

export default FileUpload;
