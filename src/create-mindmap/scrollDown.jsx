import React from 'react'

function ScrollDown() {
  return (
    <>
    <div className="absolute bottom-5 animate-bounce rounded-lg hover:shadow-lg p-1 flex flex-col justify-center items-center">
            <div className="">
            <h3 className="bg-moving-gradient rounded-full p-1 px-3 hover:shadow-lg">Scroll down to use</h3>
            </div>
            <svg
                className="w-8 h-8 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"

            >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
    </>
  )
}

export default ScrollDown