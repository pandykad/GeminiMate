import React, { createContext, useState } from 'react'
import { runGemini, runGeminiImage, runGeminiQuizAnalysis, runGeminiRoadMapJSON, runGeminiRoadMapJSONForTopic } from './gemini';
import uploadFile from '@/lib/fileUploadUtil';

export const GeminiContext = createContext();

const GeminiContextProvider = (props) => {
  const [quizTopic, setQuizTopic] = useState("")
  const [dificulty, setDifficulty] = useState(1)
  const [numberOfQuestions, setNumberOfQuestions] = useState(10)
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null)
  const [topics, setTopics] = useState(['Math', 'Science', 'History', 'Geography'])
  const [userAnswers, setUserAnswers] = useState([])
  const [userAnalytics, setUserAnalytics] = useState({})
  const [roadmapData, setRoadmapData] = useState({})

  const sendPrompt = async (topic, numberOfQuestions, difficulty) => {
    let quizPrompt = `Give me a list of ${numberOfQuestions} questions on the topic: ${topic}.
        The difficulty of each of the questions should be ${difficulty}. 
        Difficulty 1 is the easiest while difficulty 10 is the hardest. 
        For each of the questions give me 4 options of which 1 is the write answer. Shuffle the options. Mention the correct option at first, second, third or fourth pplace randomly for each question.
        Give the correct answers for each questions as well.
        The format of the response should be as follows:
        The first line of the question should contain the question.
        The second line, should contain four options separeted by a ';'.
        The third line, should contain the correct answer.
        The next line should be empty.
        For example, the format should be like this:
        Sample question 1?
        OptionA OptionB OptionC OptionD
        OptionC
        
        Sample question 1?
        OptionA OptionB OptionC OptionD
        OptionC

        Do not include any other text other than the questions, options and answers.
        `

    let response = ""
    setLoading(true)

    if (topic !== undefined) {
      response = await runGemini(quizPrompt);
    }

    console.log(response)
    parseQuestions(response)
    setLoading(false)
    setQuizTopic(topic)
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null)
  }

  const parseQuestions = (response) => {
    const questions = [];
    const lines = response.trim().split('\n');

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    for (let i = 0; i < lines.length; i += 4) {
      const questionText = lines[i].trim();
      let optionsText = lines[i + 1].trim().split(';');
      const answerText = lines[i + 2].trim();

      optionsText = shuffleArray(optionsText);

      questions.push({
        question: questionText,
        options: optionsText,
        answer: answerText
      });
    }

    setQuestions(questions);
  }

  const uploadImage = async () => {

    const uploadUrl = 'http://localhost:3000/api/generateQuizTopics';

    console.log("handling upload")

    try {
      const result = await uploadFile(uploadedFile, uploadUrl);
      if (result) {
        //   toast("Response received successfully from Gemini");
        //   console.log(result.substring(3, result.length - 3));
        //   handleChange(result.substring(3, result.length - 3));
        parseTopics(result)
      }
    } catch (error) {
      console.error('Error:', error);
      // toast("Error uploading file");
    } finally {
      setUploadedFile(null);
    }
  }

  const parseTopics = (response) => {
    const topics = [];
    const lines = response.trim().split('\n');

    lines.forEach(line => {
      topics.push(line);
    });

    setTopics(topics)
    console.log(topics)
  }

  const analyzeQuiz = async () => {
    console.log("Entered analyzeQuiz")

    let prompt = `Below is a list of questions, their correct answer and the answer that was selected by the user.
    The format of the questions, correct answer and incorrect answer is as follows:
    Question 1
    Correct Answer
    User Answer
    
    Question 2
    Correct Answer
    User Answer

    The question, correct answer and user answers are each on a new line.
    There is an empty line in between all questions.

    Analyze the answers and identify how the user has performed. 
    Identify the subtopics that the user is both weak and strong. 
    Score the performance of the subtopics on a scale of 1 to 10.
    Score 1 means the user is weakest while score 10 means the user is the strongest.

    Return the subtopics and their scores.
    Each subtopic should be followed by the score sepeareted by a ': '.
    Each subtopic and the score should be present on a new line.
    For example:
    Subtopic 1: score
    Subtopic 2: score

    Leave a line empty and then return a message for the user about their performance in short. Write the message in second person.

    Leave a line and return atmost 5 suggested subtopics or topics related to the current quiz that the user can further practice and take quizes on.
    Each of the suggested topics should be on the new line.

    Therefore, your final output should look like this:
    Subtopic 1: score
    Subtopic 2: score

    User Message

    Suggested Topic 1
    Suggested Topic 2

    Do not include any other text other than the subtopics, their scores and the user message.
    `

    questions.forEach((question, index) => {
      const questionText = question.question;
      const correctAnswer = question.answer;
      const userAnswer = userAnswers[index];

      prompt += `Question: ${questionText}\n`;
      prompt += `Correct Answer: ${correctAnswer}\n`;
      prompt += `User Answer: ${userAnswer}\n\n`;
    });

    const response = await runGeminiQuizAnalysis(prompt)
    parseSubtopicsAndScores(response)
    console.log(response)
  }

  const parseSubtopicsAndScores = (response) => {
    const userAnalytics = {
      performanceScores: [],
      userMessage: "",
      suggestedTopics: []
    };

    const lines = response.trim().split('\n');
    let i = 0;

    while (i < lines.length && lines[i].trim() !== "") {
      const [name, score] = lines[i].split(':').map(str => str.trim());
      userAnalytics.performanceScores.push({ name, score: parseInt(score) });
      i++;
    }

    i++;

    while (i < lines.length && lines[i].trim() !== "") {
      userAnalytics.userMessage += lines[i] + " ";
      i++;
    }

    i++;

    while (i < lines.length) {
      userAnalytics.suggestedTopics.push(lines[i].trim());
      i++;
    }

    userAnalytics.userMessage = userAnalytics.userMessage.trim();
    setUserAnalytics(userAnalytics)
  }

  const uploadFileForRoadmap = async () => {
    console.log("inside uploadFileForRoadmap")

    const uploadUrl = 'http://localhost:3000/api/generateRoadmap';

    console.log("handling upload")
    console.log(uploadUrl)
    console.log(uploadedFile)

    try {
      const result = await uploadFile(uploadedFile, uploadUrl);
      if (result) {
        //   toast("Response received successfully from Gemini");
        //   console.log(result.substring(3, result.length - 3));
        //   handleChange(result.substring(3, result.length - 3));
        console.log(result)
        let response = result
        console.log(typeof (response))
        console.log(response)
        // const graphData = JSON.parse(response);

        // graphData = response
        setRoadmapData(response)
      }
    }
    catch (error) {
      console.error('Error:', error);
    }
    finally {
      setUploadedFile(null);
    }
  }

  const uploadedImageForRoadmap = async () => {
    if (!uploadedImage) {
      alert("Please select a file to upload.");
      return;
    }

    const reader = new FileReader();
    let prompt = `The file contains some subtopics of the main topic.
    Identify the subtopics and the main topics. Determine the relations between them. Determine which topic should be learnt before moving to another topic.
    Create a roadmap from these topics. The first topic should the topic which needs to be learnt first, then the second and so on.
    Analyze it and return the topics for a roadmap.
    The roadmap contains nodes which are the topics and edges which represent the connections between the topics.
    The roadmap should be like a flow chart of the topics
    Each node will have a width of 180px, and a height of 70px. Adjust the positions of each of the node accordingly. Do not let the nodes overlap. Have atleast 10px vertical and horzontal distance between each nodes.
    Position the nodes hierarchically in a tree like structure.
    Generate the JSON schema using the following template:
    {
      nodes: {
        {
          id: '1',          // Unique identifier for the node
          data: { label: 'Node 1' },  // Data for the node, typically the label
          position: { x: 100, y: 100 }, // Position on the canvas (optional, can be auto-calculated)
          type: 'custom',
        },
        {
          id: '2',
          data: { label: 'Node 2' },
          position: { x: 200, y: 200 },
        },
      },

      edges: {
        {
          id: 'e1-2',      // Unique identifier for the edge
          source: '1',     // ID of the source node
          target: '2',     // ID of the target node
          type: 'smoothstep', // Type of edge (e.g., 'default', 'smoothstep', 'straight', etc.)
        },
      }
    }`

    reader.onload = async (event) => {
      const base64Data = event.target.result.split(',')[1];

      const imageData = {
        inlineData: {
          data: base64Data,
          mimeType: "image/png",
        },
      }

      let response = await runGeminiRoadMapJSON(prompt, imageData)
      console.log(response)
      console.log(typeof(response))
      // const graphData = JSON.parse(response);
      graphData = response
      console.log(graphData)
      setRoadmapData(graphData)
    }

    reader.readAsDataURL(uploadedImage);
  }

  const topicForRoadMap = async (topic) => {
    let prompt = `The topic is: ${topic}.
    Identify the subtopics which need to be learnt before learning the current topic. Determine the relations between them. Determine which topic should be learnt before moving to another topic.
    Create a roadmap from these topics. The first topic should the topic which needs to be learnt first, then the second and so on.
    Analyze it and return the topics for a roadmap.
    The roadmap contains nodes which are the topics and edges which represent the connections between the topics.
    The roadmap should be like a flow chart of the topics
    Each node will have a width of 180px, and a height of 70px. Adjust the positions of each of the node accordingly. Do not let the nodes overlap. Have atleast 10px vertical and horzontal distance between each nodes.
    Position the nodes hierarchically in a tree like structure.
    Generate the JSON schema using the following template:
    {
      nodes: {
        {
          id: '1',          // Unique identifier for the node
          data: { label: 'Node 1' },  // Data for the node, typically the label
          position: { x: 100, y: 100 }, // Position on the canvas (optional, can be auto-calculated)
          type: 'custom',
        },
        {
          id: '2',
          data: { label: 'Node 2' },
          position: { x: 200, y: 200 },
        },
      },

      edges: {
        {
          id: 'e1-2',      // Unique identifier for the edge
          source: '1',     // ID of the source node
          target: '2',     // ID of the target node
          type: 'smoothstep', // Type of edge (e.g., 'default', 'smoothstep', 'straight', etc.)
        },
      }
    }`

    let response = await runGeminiRoadMapJSONForTopic(prompt)
    console.log(response)
    const graphData = JSON.parse(response);
    setRoadmapData(graphData)
  }

  const geminiContextValue = {
    showResult, setShowResult,
    loading, setLoading,
    questions,
    quizTopic,
    sendPrompt,
    dificulty, setDifficulty,
    numberOfQuestions, setNumberOfQuestions,
    currentQuestionIndex, setCurrentQuestionIndex,
    selectedOption, setSelectedOption,
    score, setScore,
    uploadedFile, setUploadedFile,
    uploadImage, uploadFileForRoadmap,
    topics,
    userAnswers, setUserAnswers,
    analyzeQuiz,
    userAnalytics,
    uploadedImageForRoadmap,
    roadmapData,
    topicForRoadMap
  }

  return (
    <GeminiContext.Provider value={geminiContextValue}>
      {props.children}
    </GeminiContext.Provider>
  )
}

export default GeminiContextProvider