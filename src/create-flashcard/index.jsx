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

helix.register()



function CreateFlashCard() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [generateButtonClicked, setGenerateButtonClicked] = useState(false);



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
   
        let start = result.indexOf("[")
        let end = result.indexOf("]")
        const resultArr = result.substring(start, end+1)

        console.log(resultArr);

        
        setResult(JSON.parse(resultArr));

        toast("Response recieved successfully from Gemini");
      }
    } catch (error) {
      console.error("Error:", error);
      toast("Error uploading file");
    } finally {
      setGenerateButtonClicked(false); // Stop showing the loader after the upload is done or if there's an error
  }
  };

  const loader = 
  <div class="magic-animation">
    <div className="p-5">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 203 148.27">
    <g id="wand">
      <g class="cls-1">
        <path d="M194.63,152.18v-7.76C194.6,147,194.6,149.59,194.63,152.18Z" transform="translate(-10 -31.06)" />
      </g>
      <rect class="cls-2" x="5.07" y="129.83" width="117.08" height="17.1" transform="translate(-77.95 30.6) rotate(-35.06)" />
      <rect class="cls-3" x="106.38" y="88.26" width="32.89" height="17.1" transform="translate(-43.33 57.07) rotate(-35.06)" />
      <ellipse class="cls-4" cx="136.21" cy="87.42" rx="3.29" ry="8.55" transform="translate(-35.5 63.06) rotate(-35.06)" />
      <ellipse class="cls-2" cx="15.6" cy="172.07" rx="3.29" ry="8.55" transform="translate(-106.02 9.13) rotate(-35.06)" />
      <ellipse class="cls-3" cx="109.5" cy="106.16" rx="3.29" ry="8.55" transform="translate(-51.12 51.12) rotate(-35.06)" />
      <path class="cls-5" d="M138.71,85.25s4.26,6.06,2.68,9L20.15,179.32s-3.27.49-7.53-5.57Z" transform="translate(-10 -31.06)" />
    </g>
    <g id="stars">
      <g id="star1">
        <polygon class="cls-6" points="142.22 4.88 138.59 13.13 147.13 17.7 137.94 19.78 139.9 28.82 132.07 23.15 125.96 29.86 125.38 20.71 115.81 20.03 122.93 14.3 117.1 6.74 126.55 8.74 128.85 0 133.51 8.22 142.22 4.88" />
        <polygon class="cls-7" points="142.29 4.89 136.56 13.87 144.96 17.35 136.17 18.98 138.3 26.2 131.33 20.74 125.88 29.85 132.06 23.11 139.91 28.82 137.95 19.81 147.12 17.74 138.59 13.11 142.29 4.89" />
      </g>
      <g id="star2">
        <polygon class="cls-6" points="166.3 14.45 165.13 17.09 167.87 18.55 164.93 19.22 165.55 22.12 163.04 20.3 161.09 22.45 160.9 19.52 157.83 19.3 160.11 17.46 158.25 15.04 161.27 15.68 162.01 12.88 163.51 15.52 166.3 14.45" />
        <polygon class="cls-7" points="166.32 14.45 164.48 17.33 167.18 18.44 164.36 18.96 165.04 21.28 162.81 19.53 161.06 22.45 163.04 20.29 165.56 22.12 164.93 19.23 167.87 18.57 165.13 17.08 166.32 14.45" />
      </g>
      <g id="star3">
        <polygon class="cls-6" points="202.01 38.12 194.78 46.34 203 54.75 191.61 53.79 190.56 64.97 183.57 55.54 174.05 61.06 176.73 50.27 165.91 45.98 176.24 41.95 172.26 31.08 182.46 36.84 188.33 27.58 190.71 38.8 202.01 38.12" />
        <polygon class="cls-7" points="202.08 38.15 192.17 46.45 200.62 53.55 189.85 52.21 189.67 61.34 183.6 52.48 173.96 61.03 183.58 55.49 190.57 64.97 191.6 53.83 202.97 54.79 194.8 46.31 202.08 38.15" />
      </g>
      <g id="star4">
        <polygon class="cls-6" points="155.07 63.05 153.01 67.75 157.87 70.35 152.64 71.52 153.75 76.67 149.3 73.44 145.83 77.25 145.5 72.05 140.06 71.67 144.1 68.41 140.79 64.11 146.16 65.25 147.47 60.28 150.13 64.95 155.07 63.05" />
        <polygon class="cls-7" points="155.11 63.06 151.86 68.17 156.63 70.14 151.63 71.07 152.84 75.17 148.88 72.07 145.78 77.25 149.29 73.42 153.76 76.67 152.65 71.54 157.86 70.36 153.01 67.73 155.11 63.06" />
      </g>
    </g>
  </svg>

    
  </div>
</div>

    const wand = <div className="flex flex-col gap-10">             
                        {loader}
                        <TypeAnimation
                        sequence={[
                            'Gemini',
                            500,
                            'says', //  Continuing previous Text
                            500,
                            'Abra ka Dabra!',
                            500,
                            'Gemini says "Abra ka Dabra!"',
                            500,
                        ]}
                        style={{ fontSize: '2em' }}
                        repeat={Infinity}
                        />
                </div>

return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-[100vh]">
        <div className="text-center">
          <h1 className="text-5xl pb-2">
            Supercharge your learning with Flashcards!
          </h1>
          <h1 className="text-xl pt-5 pb-10">
            Generate flashcards from any text-book, any document shared by your
            teacher 📚
          </h1>
        </div>
        <img
          src="src/assets/flashcard-hero.svg"
          alt="Flashcard Illustration"
          className="bottom-10 w-3/4 h-auto max-w-lg"
        />
        {/* Bouncing Arrow Indicator */}
        <div className="absolute bottom-5 rounded-lg p-1 items-center justify-center flex flex-col">
            <div className="animate-bounce">
            <h3 className="bg-moving-gradient rounded-full p-1 px-3 hover:shadow-lg">Scroll down to use</h3>
            </div>
          <svg
            className="w-8 h-8 text-gray-500 "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center justify-center h-screen bg-moving-gradient">

        {!generateButtonClicked && result == null ? (
          <FileUpload
            handler={onGenerateFlashCardHandler}
            setFile={setFile}
            generateButton={"Get FlashCards!"}
          />
        ) : generateButtonClicked && result == null ? (
            <Loader/>
        ) : (
          <FlashcardArray cards={result} />
        )}
      </div>
    </>
  );
}
  

export default CreateFlashCard;
