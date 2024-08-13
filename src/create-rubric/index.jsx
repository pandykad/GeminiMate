import React, { useState } from "react";
import FileUpload2 from "@/components/custom/FileUpload2";
import uploadFiles from "@/lib/fileUploadUtil2"; // Note: Updated function name
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";
import './button.css'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import CustomBarChart from './BarChart';


function GradeMe() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [responseRecieved, setResponseRecieved] = useState(false);
  const [feedback, setFeedback] = useState({
    gradeOnEachRubric: [],
    positives: [],
    negatives: [],
    overall: "",
    suggestions: [],
    improvedVersion: "",
  });
  const [getReviewButtonClicked, setGetReviewButtonClicked] = useState();

  const handleUpload = async () => {
    setResponseRecieved(false);
    const uploadUrl = "http://localhost:3000/api/gradeMe";
    const additionalFields = {
      userId: "12345",
      description: "Uploading multiple files",
    };

    const files = {
      file1,
      file2,
    };

    console.log(files);

    try {
      const response = await uploadFiles(files, uploadUrl, additionalFields);
      console.log("Files uploaded successfully:", response);

      setFeedback(response);
      setResponseRecieved(true);
      toast("Response recieved successfully from Gemini");
    } catch (error) {
      console.error("Error uploading files:", error);
      toast("Error uploading file");
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
            <div className="flex h-full items-center justify-center p-6">
              <div className="flex flex-col justify-center items-center">
                <div>
                  <FileUpload2
                    setFile={setFile1}
                    id="file1"
                    docText="Please select your work"
                  />
                </div>
                <div>
                  <FileUpload2
                    setFile={setFile2}
                    id="file2"
                    docText="Please select the rubric"
                  />
                </div>
                <Button onClick={handleUpload}>Upload Files</Button>
              </div>{" "}
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={70}>
            <div className="flex flex-col gap-2 h-full items-center justify-center p-1">
              <div>
                <Tabs defaultValue="Analysis" className="w-[60vw] gemini-gradient-rubric-button rounded-3xl p-6">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="Analysis">Analysis</TabsTrigger>
                    <TabsTrigger value="Positives">Positives</TabsTrigger>
                    <TabsTrigger value="Negatives">Negatives</TabsTrigger>
                    <TabsTrigger value="Suggestions">Suggestions</TabsTrigger>
                    <TabsTrigger value="Overall">Overall</TabsTrigger>
                  </TabsList>
                  <TabsContent value="Overall">
                    <Card>
                      <CardHeader>
                        <CardTitle>Your overall performance</CardTitle>
                        <CardDescription>
                          How everything works together?
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <ScrollArea className="h-[40vh] rounded-md p-4 md:mx-8">
                          {feedback == "" ? (
                            <div className="flex flex-col justify-center items-center gap-1">
                              <div>
                                <h1 className="text-center text-sm">
                                  Lets get you a personalized review
                                </h1>
                              </div>
                              <div>
                                <p className="text-center text-sm">
                                  Please upload you Essay/Homework/Assignment
                                  and the grading rubric
                                </p>
                              </div>
                            </div>
                          ) : (
                            <Markdown remarkPlugins={[remarkGfm]}>
                              {feedback.overall}
                            </Markdown>
                          )}
                        </ScrollArea>
                      </CardContent>
                      <CardFooter>
                        <p>Review powered by Gemini 🧚‍♀️</p>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="Analysis">
                    <Card>
                      <CardHeader>
                        <CardTitle>Lets visualize</CardTitle>
                        <CardDescription>
                          Analysis visualized bsed on the rubric provided
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <ScrollArea className="h-[40vh] rounded-md p-4 md:mx-8">
                          {feedback == "" ? (
                            <div className="flex flex-col justify-center items-center gap-1">
                              <div>
                                <h1 className="text-center text-sm">
                                  Lets get you a personalized review
                                </h1>
                              </div>
                              <div>
                                <p className="text-center text-sm">
                                  Please upload you Essay/Homework/Assignment
                                  and the grading rubric
                                </p>
                              </div>
                            </div>
                          ) : (
                              <div className="flex flex-col justify-center items-center text-center w-full">
                          {console.log(feedback.gradeOnEachRubric)}
                          <h1 className="text-center mt-0">Your Performance</h1>
                          <CustomBarChart performanceScores={feedback.gradeOnEachRubric} />
                          </div>
                          )}
                        </ScrollArea>
                      </CardContent>
                      <CardFooter>
                        <p>Review powered by Gemini 🧚‍♀️</p>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="Positives">
                    <Card>
                      <CardHeader>
                        <CardTitle>Whats working?</CardTitle>
                        <CardDescription>
                          Lets find out the great things you are doing
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <ScrollArea className="h-[40vh] rounded-md p-4 md:mx-8">
                          {feedback == "" ? (
                            <div className="flex flex-col justify-center items-center gap-1">
                              <div>
                                <h1 className="text-center text-sm">
                                  Lets get you a personalized review
                                </h1>
                              </div>
                              <div>
                                <p className="text-center text-sm">
                                  Please upload you Essay/Homework/Assignment
                                  and the grading rubric
                                </p>
                              </div>
                            </div>
                          ) : (
                            <ul style={{ listStyleType: "disc" }}>
                              {feedback.positives.map((positive, index) => (
                                <li key={index}>{`• ${positive}`}</li>
                              ))}
                            </ul>
                          )}
                        </ScrollArea>
                      </CardContent>
                      <CardFooter>
                        <p>Review powered by Gemini 🧚‍♀️</p>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="Negatives">
                    <Card>
                      <CardHeader>
                        <CardTitle>Whats not working?</CardTitle>
                        <CardDescription>
                          Its okay to make mistakes, they make us better!
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <ScrollArea className="h-[40vh] rounded-md p-4 md:mx-8">
                          {feedback == "" ? (
                            <div className="flex flex-col justify-center items-center gap-1">
                              <div>
                                <h1 className="text-center text-sm">
                                  Lets get you a personalized review
                                </h1>
                              </div>
                              <div>
                                <p className="text-center text-sm">
                                  Please upload you Essay/Homework/Assignment
                                  and the grading rubric
                                </p>
                              </div>
                            </div>
                          ) : (
                            <ul style={{ listStyleType: "disc" }}>
                              {feedback.negatives.map((negative, index) => (
                                <li key={index}>{`• ${negative}`}</li>
                              ))}
                            </ul>
                          )}
                        </ScrollArea>
                      </CardContent>
                      <CardFooter>
                        <p>Review powered by Gemini 🧚‍♀️</p>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="Suggestions">
                    <Card>
                      <CardHeader>
                        <CardTitle>How can we improve it?</CardTitle>
                        <CardDescription>Lets make it better!</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <ScrollArea className="h-[40vh] rounded-md p-4 md:mx-8">
                          {feedback == "" ? (
                            <div className="flex flex-col justify-center items-center gap-1">
                              <div>
                                <h1 className="text-center text-sm">
                                  Lets get you a personalized review
                                </h1>
                              </div>
                              <div>
                                <p className="text-center text-sm">
                                  Please upload you Essay/Homework/Assignment
                                  and the grading rubric
                                </p>
                              </div>
                            </div>
                          ) : (
                            <ul style={{ listStyleType: "disc" }}>
                              {feedback.suggestions.map((suggestion, index) => (
                                <li key={index}>{`• ${suggestion}`}</li>
                              ))}
                            </ul>
                          )}
                        </ScrollArea>
                      </CardContent>
                      <CardFooter>
                        <p>Review powered by Gemini 🧚‍♀️</p>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
              {responseRecieved && (
                <Drawer>
                  <DrawerTrigger>
                    <Button>Improvements with Gemini</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Improved Version</DrawerTitle>
                      <DrawerDescription>
                        Your work + Gemini magic = Great Job!
                      </DrawerDescription>
                    </DrawerHeader>
                    <ScrollArea className="h-[70vh] rounded-md border p-4 md:mx-8">
                      <Markdown remarkPlugins={[remarkGfm]}>
                        {feedback.improvedVersion}
                      </Markdown>
                    </ScrollArea>
                    <DrawerFooter>
                      <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}

export default GradeMe;
