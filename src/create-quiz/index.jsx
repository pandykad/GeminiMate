import React from "react";
import QuizActionBar from "./QuizActionBar/QuizActionBar";
import QuizHome from "./QuizHome/QuizHome";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@radix-ui/react-scroll-area";

function Quiz() {
  return (
    <>
      <div className="flex justify-center items-center min-h-[90vh]">
        <ResizablePanelGroup
        direction="horizontal"
        className="max-w-[95vw] rounded-lg"
      >
        <ResizablePanel defaultSize={30}>
          <div className="flex h-[90vh] items-center justify-center p-6">
            <QuizActionBar/>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <div className="flex h-[90vh] items-center justify-center p-6">
          <QuizHome />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      </div>

    </>
  );
}

export default Quiz;
