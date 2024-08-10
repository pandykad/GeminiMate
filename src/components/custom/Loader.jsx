import React, { useState } from 'react'
import { helix } from 'ldrs'
import { TypeAnimation } from 'react-type-animation';


helix.register()

function Loader() {
    const [textColor, setTextColor] = useState('#34A853');

  return (
    <>
    <div className="flex flex-col gap-4">

        <div className="flex flex-col gap-7 justify-center items-center rounded-full bg-slate-50 w-[20vw] h-[24vh] shadow-lg">             
        <l-helix size="80" speed="2.5" color="#4285F4"></l-helix>
        <div style={{ color: textColor }}> 
        <TypeAnimation

            style=
            {{ 
                fontSize: '1.4em', 
            }}

            sequence={[
                'Gemini magic at 10%',
                1500,
                () => setTextColor('#4285F4'),

                'Gemini magic at 12%',
                1000,
                () => setTextColor('#FBBC05'),

                'Gemini magic at 25%',
                1700,
                () => setTextColor('#EA4335'),

                'Gemini magic at 30%',
                2000,
                () => setTextColor('#34A853'),

                'Gemini magic at 60%',
                1000,
                () => setTextColor('#4285F4'),

                'Gemini magic at 80%',
                10000,
                () => setTextColor('#FBBC05'),

                'Gemini magic at 100%',
                // () => setTextColor('#EA4335'),

            ]}
            speed={50}
            repeat={0}
            omitDeletionAnimation={true}
            />
            </div>
        </div>
        </div>
    </>
  )
}

export default Loader