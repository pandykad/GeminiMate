import React, { useContext } from 'react';
import QuizQuestion from '../QuizQuestion/QuizQuestion';
import { useState, useEffect } from 'react';
import { GeminiContext } from '@/GeminiContext/GeminiContext';
import { FunctionCallingMode } from '@google/generative-ai/server';
import CustomBarChart from '../graphs/BarChart';
import { ScrollArea } from '@/components/ui/scroll-area';
import '../QuizActionBar/bg.css'

const QuizHome = () => {
    const {
        questions, quizTopic, 
        selectedOption, setSelectedOption,
        currentQuestionIndex, setCurrentQuestionIndex, 
        score, setScore,
        userAnswers, setUserAnswers,
        analyzeQuiz,
        userAnalytics,
        sendPrompt,
        numberOfQuestions,
        difficulty
    } = useContext(GeminiContext);

    useEffect(() => {
        if (selectedOption !== null) {
            if (selectedOption === questions[currentQuestionIndex].answer) {
                setScore(prevScore => prevScore + 1);
            }
            setUserAnswers(prevAnswers => [...prevAnswers, selectedOption]);
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);

            setSelectedOption(null);
        }
    }, [selectedOption]);

    useEffect(() => {
        const analyzeQuizAsync = async () => {
            await analyzeQuiz();
        };

        if (questions.length > 0 && currentQuestionIndex >= questions.length) {
            analyzeQuizAsync();
        }
    }, [currentQuestionIndex]);

    if (questions.length > 0 && currentQuestionIndex >= questions.length) {
        const { performanceScores = [], userMessage = "", suggestedTopics = [] } = userAnalytics || {};

        return (
            <>
             <ScrollArea className="h-[90vh] rounded-md">
                <div className="flex-grow flex flex-col items-center bg-beige p-5 shadow-md rounded-xl justify-center m-1 min-[95vh]">
                    <p className="text-2xl font-semibold mt-0">Your score: {score} / {numberOfQuestions}</p>
                    <h4 className="w-[90%] text-center">{userAnalytics.userMessage}</h4>

                    <hr className="border-t border-black my-5 w-[90%]" />
                    
                    <div className="flex flex-col justify-center items-center text-center w-full">
                        <h1 className="text-center mt-0">Your Performance</h1>
                        <CustomBarChart performanceScores={userAnalytics.performanceScores} />
                    </div>

                    <hr className="border-t border-black my-5 w-[90%]" />

                    <h4 className="w-[90%] text-center">Suggested Topics</h4>
                    <div className="flex justify-center flex-wrap gap-2.5 mt-5">
                        {suggestedTopics.length > 0 ? (
                            suggestedTopics.map((topic, index) => (
                                <div 
                                    onClick={async () => await sendPrompt(topic, numberOfQuestions, difficulty)} 
                                    className="gemini-gradient-topic px-4 py-2 cursor-pointer rounded-3xl text-center hover:bg-gradient-to-r from-[#4b90ff] to-[#ff5546] hover:text-white transition-all duration-300"
                                    key={index}
                                >
                                    {topic}
                                </div>
                            ))
                        ) : (
                            <h4 className="w-[90%] text-center">Suggesting...</h4>
                        )}
                    </div>
                </div>
                </ScrollArea>
            </>

        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-full w-full bg-beige p-5 shadow-md rounded-xl m-1 bg-slate-50">
            {/* Title Section */}
            
            <div className="w-full flex justify-center items-center mb-5">
                <h2 className="text-2xl font-semibold text-center">{quizTopic} Quiz</h2>
            </div>
    
            {/* Content Section */}
            <div className="w-full flex flex-col items-center">
                {questions.length !== 0 ? (
                    <QuizQuestion
                        question={questions[currentQuestionIndex]}
                        setSelectedOption={setSelectedOption}
                    />
                ) : (
                    <h2 className="text-2xl font-semibold text-center">Please Select a Topic.</h2>
                )}
            </div>
            
        </div>
        
    );
    
    
};

export default QuizHome;
