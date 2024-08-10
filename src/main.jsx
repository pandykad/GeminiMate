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
import GeminiContextProvider from './create-quiz/GeminiContext/GeminiContext.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/create-flashcard",
    element: <CreateFlashCard/>,
  },
  {
    path: "/create-mindmap",
    element: <MarkmapHooks/>
  },
  {
    path: "/create-quiz",
    element: <Quiz/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GeminiContextProvider>
    <Header/>
    <Toaster/>
    <RouterProvider router={router} />
    </GeminiContextProvider>
  </React.StrictMode>,
)
