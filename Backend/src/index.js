// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const { uploadToGemini } = require('./util');

// const app = express();
// const port = 3000;

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { handleFile } = require("./uploadToGemini"); // Ensure this path is correct
const { startChatSession } = require("./chatSession");

const app = express();
const port = 3000;
app.use(cors()); // Enable CORS

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer to use the custom uploads directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name
  },
});

async function processFileAndStartChat(filePath, userQuery, responseType) {
  try {
    const files = await handleFile(filePath);
    // console.log(files[0].uri)
    // console.log(files[0])

    // const history = [
    //     {
    //       role: "user",
    //       parts: [
    //         {
    //           fileData: {
    //             mimeType: files[0].mimeType,
    //             fileUri: files[0].uri,
    //           },
    //         },
    //         { text: userQuery },
    //       ],
    //     },
    //     {
    //       role: "model",
    //       parts: [
    //         {
    //           text: modelAns,
    //         },
    //       ],
    //     },
    //   ];
    // const mime = files[0].mimeType
    // const uri = files[0].uri

    const result = await startChatSession(files, userQuery, responseType);
    // console.log("Chat session started:", chatSession);

    // const result = await chatSession.sendMessage(files);
    console.log(result.response.text());

    return result;
  } catch (error) {
    console.error("Error processing file and starting chat session:", error);
  } finally {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}

const upload = multer({ storage });

app.post("/api/generateFlashcards", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = req.file.path;
  const userQuery = `Analyze the information in the file and create me a flashcard quiz of 10 questions. Can you please provide me the output in JSON format using the following schema: 
  {
  result: [
  {
    id: 1,
    frontHTML: <div className='flex h-full justify-center items-center p-2'><div className='text-blue-500 text-center text-xl'>What is a data structure used for storing data in a Last-In-First-Out (LIFO) manner?</div></div>,
    backHTML: <div className='flex h-full justify-center items-center p-2'><div className='text-blue-700 text-center text-2xl animate-bounce bg-yellow-200 p-2 rounded-md'>Stack</div></div>,
  },
  {
    id: 2,
    frontHTML: <div className='flex h-full justify-center items-center p-2'><div className='text-blue-500 text-center text-xl'>Which data structure follows the First-In-First-Out (FIFO) principle?</div></div>,
    backHTML: <div className='flex h-full justify-center items-center p-2'><div className='text-blue-700 text-center text-2xl animate-bounce bg-yellow-200 p-2 rounded-md'>Queue</div></div>,
  },
  {
    id: 3,
    frontHTML: <div className='flex h-full justify-center items-center p-2'><div className='text-blue-500 text-center text-xl'>What type of search algorithm is best suited for a sorted array?</div></div>,
    backHTML: <div className='flex h-full justify-center items-center p-2'><div className='text-blue-700 text-center text-2xl animate-bounce bg-yellow-200 p-2 rounded-md'>Binary Search</div></div>,
  },
  {
    id: 4,
    frontHTML: <div className='flex h-full justify-center items-center p-2'><div className='text-blue-500 text-center text-xl'>Describe the time complexity of accessing an element in a hash table in the best-case scenario.</div></div>,
    backHTML: <div className='flex h-full justify-center items-center p-2'><div className='text-blue-700 text-center text-2xl animate-bounce bg-yellow-200 p-2 rounded-md'>O(1)</div></div>,
  },
  {
    id: 5,
    frontHTML: <div className='flex h-full justify-center items-center p-2'><div className='text-blue-500 text-center text-xl'>What is the difference between a graph and a tree data structure?</div></div>,
    backHTML: <div className='flex h-full justify-center items-center p-2'><div className='text-blue-700 text-center text-2xl animate-bounce bg-yellow-200 p-2 rounded-md'>A tree is a hierarchical structure with a single root node, while a graph is a more general structure that allows for cycles and multiple paths between nodes.</div></div>,
  },
  {
    id: 6,
    frontHTML: <div className='flex h-full justify-center items-center p-2'><div className='text-blue-500 text-center text-xl'>Name two common methods for traversing a tree data structure.</div></div>,
    backHTML: <div className='flex h-full justify-center items-center p-2'><div className='text-blue-700 text-center text-2xl animate-bounce bg-yellow-200 p-2 rounded-md'>Depth-First Search (DFS) and Breadth-First Search (BFS)</div></div>,
  },
  {
    id: 7,
    frontHTML: <div className='flex h-full justify-center items-center p-2'><div className='text-blue-500 text-center text-xl'>What is the purpose of a sorting algorithm?</div></div>,
    backHTML: <div className='flex h-full justify-center items-center p-2'><div className='text-blue-700 text-center text-2xl animate-bounce bg-yellow-200 p-2 rounded-md'>To arrange elements in a specific order, such as ascending or descending.</div></div>,
  },
  {
    id: 8,
    frontHTML: <div className='flex h-full justify-center items-center p-2'><div className='text-blue-500 text-center text-xl'>Give an example of a divide-and-conquer algorithm.</div></div>,
    backHTML: <div className='flex h-full justify-center items-center p-2'><div className='text-blue-700 text-center text-2xl animate-bounce bg-yellow-200 p-2 rounded-md'>Merge Sort or Quick Sort</div></div>,
  },
  {
    id: 9,
    frontHTML: <div className='flex h-full justify-center items-center p-2'><div className='text-blue-500 text-center text-xl'>What is the time complexity of searching for an element in an unsorted array in the worst-case scenario?</div></div>,
    backHTML: <div className='flex h-full justify-center items-center p-2'><div className='text-blue-700 text-center text-2xl animate-bounce bg-yellow-200 p-2 rounded-md'>O(n)</div></div>,
  },
  {
    id: 10,
    frontHTML: <div className='flex h-full justify-center items-center p-2'><div className='text-blue-500 text-center text-xl'>Explain the difference between linear and non-linear data structures.</div></div>,
    backHTML: <div className='flex h-full justify-center items-center p-2'><div className='text-blue-700 text-center text-2xl animate-bounce bg-yellow-200 p-2 rounded-md'>Linear data structures (arrays, linked lists) store elements sequentially, while non-linear data structures (trees, graphs) don't follow a linear sequence.</div></div>,
  },
]
  }`;

  const responseType = "application/json";

  //   const modelAns = "You received an A in CIS600 Design & Analysis of Algorithms. \n"
  //   const nextUserQuery = "What score did I get in Mobile programming?"

  const result = await processFileAndStartChat(
    filePath,
    userQuery,
    responseType
  );

  res.send(result?.response?.text());
});

app.post("/api/generateMindmap", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = req.file.path;
  const userQuery =
    "Analyze the information in the file and create me a mind map to aid my learning, and provide me the output in markdown format. Below is the example for of how I want the markdown to be:\n\n---\ntitle: Data Structures in Computer Science\nmarkmap:\n  colorFreezeLevel: 2\n---\n\n## What are Data Structures?\n\n- Ways of organizing and storing data in a computer\n- Optimized for efficient access, modification, and storage\n- Choice of data structure depends on the specific task and data\n\n## Types of Data Structures\n\n### 1. Linear Data Structures\n\n- Data elements are arranged sequentially, with each element connected to the one before and after it\n- **Examples:**\n    - **Arrays:** Collection of elements stored in contiguous memory locations\n    - **Linked Lists:** Elements linked using pointers, allowing for dynamic size and efficient insertions/deletions\n    - **Stacks:** LIFO (Last-In, First-Out) structure, useful for function calls and undo mechanisms\n    - **Queues:** FIFO (First-In, First-Out) structure, useful for managing tasks and simulations\n\n### 2. Non-Linear Data Structures\n\n- Data elements are not arranged sequentially and can have hierarchical relationships\n- **Examples:**\n    - **Trees:** Hierarchical structure with nodes connected by edges, often used for searching and representing hierarchies (e.g., file systems)\n        - **Binary Trees:** Each node has at most two children, efficient for searching and sorting\n        - **Heaps:** Special type of binary tree where the parent node is always greater (or smaller) than its children, useful for priority queues\n    - **Graphs:** Collection of nodes (vertices) connected by edges, representing relationships between entities (e.g., social networks, maps)\n\n## Common Operations\n\n- **Insertion:** Adding new data elements\n- **Deletion:** Removing data elements\n- **Searching:** Finding specific data elements\n- **Traversal:** Accessing each element once in a specific order\n- **Sorting:** Arranging elements in a particular order\n- **Merging:** Combining two or more data structures\n\n## Choosing the Right Data Structure\n\n- **Type of data:** Numbers, strings, objects, etc.\n- **Frequency of operations:** Which operations are performed most often?\n- **Memory usage:** How much space is available?\n- **Time complexity:** Efficiency of different operations (insertion, deletion, search, etc.)\n\n## Applications\n\n- **Database management:** Organizing and retrieving large amounts of data\n- **Software development:** Implementing efficient algorithms and data storage\n- **Artificial Intelligence:** Representing knowledge and relationships in AI systems\n- **Computer Graphics:** Storing and manipulating graphical objects\n- **Operating systems:** Managing system resources and processes\n\n\nThis markdown provides a structured overview of data structures in computer science. You can further expand upon each section with specific examples, code implementations, and visual representations to enhance your understanding. \n";
  const responseType = "text/plain";
  // const modelAns = "---\ntitle: React.js\nmarkmap:\n  colorFreezeLevel: 2\n---\n\n## React.js\n\n- JavaScript library for building user interfaces (UIs)\n- Developed and maintained by Facebook (Meta)\n- Declarative, efficient, and flexible\n\n## Core Concepts\n\n### 1. Components\n\n- Building blocks of React applications\n- Reusable and composable\n- Can be class-based or functional\n\n### 2. JSX\n\n- JavaScript XML syntax extension\n- Allows writing HTML-like code within JavaScript\n- Makes UI structure more readable\n\n### 3. Virtual DOM\n\n- In-memory representation of the actual DOM\n- React updates the Virtual DOM first, then efficiently updates the real DOM\n- Improves performance by minimizing DOM manipulation\n\n### 4. Props\n\n- Short for properties\n- Data passed down from parent components to child components\n- Immutable within the child component\n\n### 5. State\n\n- Private data managed within a component\n- Changes to state trigger UI updates\n- Use `useState` hook in functional components\n\n## Lifecycle Methods (Class Components)\n\n- Methods called at different stages of a component's life\n- `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`\n\n## Hooks (Functional Components)\n\n- Functions that \"hook\" into React features\n- `useState`, `useEffect`, `useContext`, etc.\n\n## Event Handling\n\n- Similar to handling events in traditional web development\n- Use camelCase for event names (e.g., `onClick`, `onChange`)\n- Pass functions to event handlers\n\n## Data Management\n\n### 1. Lifting State Up\n\n- Move state to a common ancestor component to share between child components\n\n### 2. Context API\n\n- Provides a way to share data globally without prop drilling\n\n### 3. State Management Libraries\n\n- Redux, MobX, Recoil, Zustand\n- Help manage complex state and data flow in large applications\n\n## Routing\n\n- React Router is the most popular library\n- Allows defining multiple routes and handling navigation within a single-page application\n\n## Styling\n\n- Inline styles, CSS Modules, CSS-in-JS libraries (styled-components, Emotion)\n\n## Testing\n\n- Jest and React Testing Library are commonly used\n- Unit testing, integration testing, end-to-end testing\n\n## Popular Libraries and Tools\n\n- Create React App: Boilerplate for setting up React projects\n- Axios: Promise-based HTTP client\n- Redux Toolkit: Simplified Redux library\n- Material-UI, Ant Design: Component libraries\n\n## Resources\n\n- [React Official Documentation](https://reactjs.org/)\n- [React Tutorial](https://reactjs.org/tutorial/tutorial.html)\n- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)\n"
  // const nextUserQuery = "Create me a mind map for the content in the file in the same format as before in markdown."

  const result = await processFileAndStartChat(
    filePath,
    userQuery,
    responseType
  );

  res.send(result.response.text());
});

app.post("/api/generateQuizTopics", upload.single("file"), async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
  
    const filePath = req.file.path;
    const userQuery = `The file contains my information on few topics. 
    Can you analyze it and return the important topics which are essential for study and can be quized.
    Return the topics on new lines. Only return topics that are relevant to the overall theme of the file. Return 10 topics at maximum.
    For example:
    Topic1
    Topic2
    Topic3
    
    Do not include any other text other than the topic names.`    
    const responseType = "text/plain";
  
    const result = await processFileAndStartChat(
      filePath,
      userQuery,
      responseType
    );
  
    res.send(result.response.text());
  });

  app.post("/api/generateQuizQuestions", upload.single("file"), async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
  
    const filePath = req.file.path;
    const userQuery = `Give me a list of ${numberOfQuestions} questions on the topic: ${topic}.
    The difficulty of each of the questions should be ${difficulty}. 
    Difficulty 1 is the easiest while difficulty 10 is the hardest. 
    For each of the questions give me 4 options of which 1 is the write answer. Shuffle the options. Mention the correct option at first, second, third or fourth pplace randomly for each question.
    Give the correct answers for each questions as well.
    The format of the response should be as follows:
    The first line of the question should contain the question.
    The second line, should contain four options separeted by a ;.
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
    const responseType = "text/plain";
  
    const result = await processFileAndStartChat(
      filePath,
      userQuery,
      responseType
    );
  
    res.send(result.response.text());
  });  

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
