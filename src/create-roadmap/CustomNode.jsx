import React from 'react';
import { Handle } from '@xyflow/react';

const CustomNode = ({ data, onDoubleClick }) => {
    return (
        <div 
            onDoubleClick={() => onDoubleClick(data.label)}
            className="w-[200px] h-[80px] text-white border-2 border-white rounded-full p-2 text-center flex justify-center items-center cursor-pointer upload-button hover:bg-gradient-to-r from-[#4b90ff] to-[#ff5546] hover:text-white transition-all duration-300"
        >
            {data.label}
            <Handle type="source" position="bottom" id="source" />
            <Handle type="target" position="bottom" id="target" />
        </div>
    );
};

export default CustomNode;
