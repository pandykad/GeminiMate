import React, { useContext, useCallback, useState, useEffect } from 'react'
import { GeminiContext } from '@/GeminiContext/GeminiContext';
import {
    ReactFlow,
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
  } from '@xyflow/react';
import CustomNode from './CustomNode';
import '@xyflow/react/dist/style.css';
import './RoadMap.css'

const RoadMap = () => {
    const {setUploadedImage, uploadFileForRoadmap, roadmapData, topicForRoadMap, uploadedFile, setUploadedFile} = useContext(GeminiContext)
    const [fileName, setFileName] = useState("No file selected (PDF accepted)")

    const { nodes, edges } = roadmapData;

    const [newNodes, setNodes] = useState(nodes || []);
    const [newEdges, setEdges] = useState(edges || []);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    const handleFileChange = (event) => {
        setUploadedFile(event.target.files[0])
        setFileName(event.target.files[0].name);
    }

    const handleUpload = async () => {
        if (!uploadedFile) {
            console.log("Please select a File");
            toast("Please select a File");
            return;
        }

        await uploadFileForRoadmap()
    }

    const handleDoubleClick = (topic) => {
        topicForRoadMap(topic)
    }
    

    useEffect(() => {
        setNodes(nodes);
        setEdges(edges);
    }, [nodes, edges]);

    const nodeTypes = {
        custom: (props) => <CustomNode {...props} onDoubleClick={handleDoubleClick} />
    };

  return (
    <div className='h-[90vh] w-screen flex box-border'>
        {/* Action Bar */}
        
        <div className='min-h-full flex flex-col justify-center rounded-xl p-5'>
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
                className='px-3 py-2 cursor-pointer text-white bg-black mb-2 rounded-full text-center upload-button hover:bg-gradient-to-r from-[#4b90ff] to-[#ff5546] hover:text-white transition-all duration-300' 
                onClick={handleUpload}
            >
                Upload
            </button>

            <p className='p-5 text-center'>Double-click on a topic to get a more in-depth roadmap!</p>
        </div>

        {/* ReactFlow Component */}
        <div className='w-full flex justify-center items-center p-5'>
            <div className='w-full h-full max-h-[80vh] max-w-full border-2 border-black rounded-3xl upload-button'>
                <ReactFlow 
                    nodes={newNodes} 
                    onNodesChange={onNodesChange}
                    edges={newEdges}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    fitView
                >
                    <Controls />
                    <Background variant="dots" gap={12} size={1} />
                </ReactFlow>
            </div>
        </div>
    </div>
  )
}

export default RoadMap
