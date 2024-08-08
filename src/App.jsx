import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'
// import FileUpload from './components/custom/FileUpload'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <Toaster/>
        <div className='flex justify-center items-center'>
          <Link to={'/create-flashcard'}>
           <Button>Flashcard Generator</Button>
          </Link>
        </div>

        {/* <FileUpload/> */}

    </>
  )
}

export default App
