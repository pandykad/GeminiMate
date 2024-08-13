import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import RoadMap from "./RoadMap";

function RoadmapMain() {
  return (
    <>
      <div className="flex justify-center items-center ">
          <RoadMap />
      </div>

    </>
  );
}

export default RoadmapMain;
