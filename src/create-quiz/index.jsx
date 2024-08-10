import React from "react";
import QuizActionBar from "./QuizActionBar/QuizActionBar";
import QuizHome from "./QuizHome/QuizHome";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function Quiz() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[100vh]">
        <div className="text-center">
          <h1 className="text-5xl pb-2">
            Supercharge your learning with Quiznator!
          </h1>
          <h1 className="text-xl pt-5 pb-10">
            Personalized Quiz. Personalized Result. Personalized Guidance.
          </h1>
        </div>
        <img
          src="src/assets/flashcard-hero.svg"
          alt="Flashcard Illustration"
          className="bottom-10 w-3/4 h-auto max-w-lg mb-10"
        />
        {/* Bouncing Arrow Indicator */}
          <div className="rounded-lg p-1 items-center justify-center flex flex-col">
          <div className="animate-bounce -z-10">
            <h3 className="bg-moving-gradient rounded-full p-1 px-3 hover:shadow-lg">Scroll down to use</h3>
          </div>
          <svg
            className="w-8 h-8 text-gray-500 mt-2 -z-10"
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

      <div className="flex justify-center items-center ">
        <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[82vh] max-w-[95vw] rounded-lg border"
      >
        <ResizablePanel defaultSize={30}>
          <div className="flex h-full items-center justify-center p-6">
            <QuizActionBar/>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <div className="flex h-full items-center justify-center p-6">
          <QuizHome />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      </div>

    </>
  );
}

export default Quiz;
