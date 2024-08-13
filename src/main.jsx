import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import CreateFlashCard from './create-flashcard/index.jsx';
import Header from './components/custom/Header.jsx';
import { Toaster } from './components/ui/sonner.jsx';
import MarkmapHooks from './create-mindmap/index.jsx';
import Quiz from './create-quiz/index.jsx';
import GeminiContextProvider from './GeminiContext/GeminiContext.jsx';
import RoadmapMain from './create-roadmap/index.jsx';
import TailWindNavbar from './components/custom/TailwindNavbar';
import GradeMe from './create-rubric/index.jsx';
import LectureStructure from './lecture-structure/index.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/flashcards",
    element: <CreateFlashCard />,
  },
  {
    path: "/mindmap",
    element: <MarkmapHooks />
  },
  {
    path: "/quiz",
    element: <Quiz />
  },
  {
    path: "/roadmap",
    element: <RoadmapMain />
  },
  {
    path: "/rubric",
    element: <GradeMe />
  },
  {
    path: "/lecture-structure",
    element: <LectureStructure />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GeminiContextProvider>
    <TailWindNavbar/>
    <Toaster />
    <RouterProvider router={router} />
    </GeminiContextProvider>
  </React.StrictMode>,
)
