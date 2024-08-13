import React, { useState } from "react";
import FileUpload from "@/components/custom/FileUpload";
import uploadFile from "@/lib/fileUploadUtil";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";
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



function LectureStructure() {
  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState({
    lectureStructure: "",
    realExamples: "",
    analogies: "",
    experiments: "",
    funfacts: "",
  });
  const [generateButton, setGenerateButtonClicked] = useState();
  const [fileName, setFileName] = useState("No file selected (PDF accepted)")

    const handleFileChange = async (event) => {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    }

//   const handleUpload = async () => {
//     setResponseRecieved(false);
//     const uploadUrl = "http://localhost:3000/api/gradeMe";
//     const additionalFields = {
//       userId: "12345",
//       description: "Uploading multiple files",
//     };

//     const files = {
//       file1,
//       file2,
//     };

//     console.log(files);

//     try {
//       const response = await uploadFiles(files, uploadUrl, additionalFields);
//       console.log("Files uploaded successfully:", response);

//       setFeedback(response);
//       setResponseRecieved(true);
//       toast("Response recieved successfully from Gemini");
//     } catch (error) {
//       console.error("Error uploading files:", error);
//       toast("Error uploading file");
//     }
//   };

  const onGenerateLecture = async () => {
    if (!file) {
      console.log("Please select a File");
      toast("Please select a File");
      return;
    }

    setGenerateButtonClicked(true);

    const uploadUrl = "http://localhost:3000/api/generateLecture";

    try {
      const result = await uploadFile(file, uploadUrl);
      if (result) {
        console.log(result)
        setFeedback(result);
        toast("Response recieved successfully from Gemini");
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
            <div className="flex h-full items-center justify-center p-6">
              <div className="flex flex-col justify-center items-center">
                <div className='min-h-full flex flex-col justify-evenly rounded-xl'>
                <h2 className='mt-0 pb-2 text-center text-black text-lg'>Upload your syllabus document:</h2>
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
                className='py-2 cursor-pointer text-white mb-2 rounded-full text-center gemini-gradient-topic hover:bg-gradient-to-r from-[#4b90ff] to-[#ff5546] hover:text-white transition-all duration-300' 
                onClick={onGenerateLecture}
            >
                Upload
            </button>
                </div>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={70}>
            <div className="flex flex-col gap-2 h-full items-center justify-center p-1">
              <div>
                <Tabs defaultValue="Lecture" className="w-[60vw] gemini-gradient-rubric-button rounded-3xl p-6">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="Lecture">Lecture</TabsTrigger>
                    <TabsTrigger value="Real">Examples</TabsTrigger>
                    <TabsTrigger value="Analogies">Analogy</TabsTrigger>
                    <TabsTrigger value="Experiments">Experiments</TabsTrigger>
                    <TabsTrigger value="Funfacts">Fun Facts</TabsTrigger>
                  </TabsList>
                  <TabsContent value="Lecture">
                    <Card>
                      <CardHeader>
                        <CardTitle>Overall lecture structure</CardTitle>
                        <CardDescription>
                          The story is important.
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
                              {feedback.lectureStructure}
                            </Markdown>
                          )}
                        </ScrollArea>
                      </CardContent>
                      <CardFooter>
                        <p>Review powered by Gemini 🧚‍♀️</p>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="Real">
                    <Card>
                      <CardHeader>
                        <CardTitle>Give Examples</CardTitle>
                        <CardDescription>
                          Examples help the audience relate
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
                            {feedback.realExamples}
                          </Markdown>
                          )}
                        </ScrollArea>
                      </CardContent>
                      <CardFooter>
                        <p>Review powered by Gemini 🧚‍♀️</p>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="Analogies">
                    <Card>
                      <CardHeader>
                        <CardTitle>Give Analogies</CardTitle>
                        <CardDescription>
                          Analogies help the audience relate
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
                              {feedback.analogies}
                            </Markdown>
                          )}
                        </ScrollArea>
                      </CardContent>
                      <CardFooter>
                        <p>Review powered by Gemini 🧚‍♀️</p>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="Experiments">
                    <Card>
                      <CardHeader>
                        <CardTitle>Experiments</CardTitle>
                        <CardDescription>
                          Experiments encourage user engagement
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
                            {feedback.experiments}
                          </Markdown>
                          )}
                        </ScrollArea>
                      </CardContent>
                      <CardFooter>
                        <p>Review powered by Gemini 🧚‍♀️</p>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="Funfacts" >
                    <Card>
                      <CardHeader>
                        <CardTitle>Fun Facts!</CardTitle>
                        <CardDescription>Who does't enjoy fun facts?</CardDescription>
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
                              {feedback.funfacts}
                            </Markdown>
                          )}
                        </ScrollArea>
                      </CardContent>
                      <CardFooter>
                        <p>Results powered by Gemini 🧚‍♀️</p>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}

export default LectureStructure;
