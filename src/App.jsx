import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/custom/Header';
import { Toaster } from './components/ui/sonner';
import TailWindNavbar from './components/custom/TailwindNavbar';
import './App.css'

function App() {
  const navigate = useNavigate();

  return (
    <>

      <Toaster />
      <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gray-100">
        <h1 className="text-4xl font-bold mb-5">Welcome to <span className='app-name'>GeminiMate</span></h1>
        <h2 className='p-6 pt-0 mb-5'>We help you with your study work by harnessing the power of <span className='app-name'>Google Gemini</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Quiz */}
          <div onClick={() => navigate('/quiz')} className="gemini-gradient-border bg-white rounded-3xl shadow-xl p-6 max-w-xs hover:shadow-md transition-shadow duration-300 cursor-pointer">
            <p className="text-lg text-gray-700 mb-4 text-center">Take a quick test on a topic from your syllabus!</p>
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </div>
          </div>

          {/* Flashcards */}
          <div onClick={() => navigate('/flashcards')} className="gemini-gradient-border bg-white rounded-3xl shadow-xl p-6 max-w-xs hover:shadow-md transition-shadow duration-300 cursor-pointer"
          >
            <p className="text-lg text-gray-700 mb-4 text-center">Test your memory with Flashcards!</p>
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
              </svg>

            </div>
          </div>

          {/* Mindmap */}
          <div onClick={() => navigate('/mindmap')} className="bg-white rounded-3xl shadow-xl p-6 max-w-xs hover:shadow-md transition-shadow duration-300 cursor-pointer gemini-gradient-border">
            <p className="text-lg text-gray-700 mb-4 text-center">Having a hard time remembering your topics? Get a mindmap!</p>
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>

            </div>
          </div>

          {/* Roadmap */}
          <div onClick={() => navigate('/roadmap')} className="bg-white rounded-3xl shadow-xl p-6 max-w-xs hover:shadow-md transition-shadow duration-300 cursor-pointer gemini-gradient-border">
            <p className="text-lg text-gray-700 mb-4 text-center">Feeling stuck in your study plan? Get a quick roadmap on how you can get there!</p>
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
              </svg>

            </div>
          </div>

          {/* Rubric Analyzer */}
          <div onClick={() => navigate('/rubric')} className="bg-white rounded-3xl shadow-xl p-6 max-w-xs hover:shadow-md transition-shadow duration-300 cursor-pointer gemini-gradient-border">
            <p className="text-lg text-gray-700 mb-4 text-center">Analyze your homework against your professor's rubric!</p>
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
              </svg>

            </div>
          </div>

          {/* Lecture Structire */}
          <div onClick={() => navigate('/lecture-structure')} className="bg-white rounded-3xl shadow-xl p-6 max-w-xs hover:shadow-md transition-shadow duration-300 cursor-pointer gemini-gradient-border">
            <p className="text-lg text-gray-700 mb-4 text-center">Need to give a presentation or a lecture? Get a ready made structure for it!</p>
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
