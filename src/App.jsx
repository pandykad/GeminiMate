import { useState } from 'react'
import { Button } from "@/components/ui/button"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className='flex justify-center items-center'>
          <Button>Button</Button>
        </div>

    </>
  )
}

export default App
