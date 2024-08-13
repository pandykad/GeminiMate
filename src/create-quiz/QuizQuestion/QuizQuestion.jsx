import React from 'react';

const QuizQuestion = ({ question, setSelectedOption }) => {
    return (
        <div className="w-full">
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
                {question.options.map((option, index) => {
                    return (
                        <div
                            key={index}
                            className="cursor-pointer p-3 mb-2 bg-gray-100 hover:bg-[#34A853] text-black hover:text-white rounded-lg transition-colors duration-200"
                            onClick={() => setSelectedOption(option)}
                        >
                            {option}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default QuizQuestion;
