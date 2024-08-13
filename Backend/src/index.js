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
const { startChatSession, runGeminiRoadMapJSON } = require("./chatSession");

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

  const responseType = "text/plain";

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
    
    Do not include any other text other than the topic names.`;
  const responseType = "text/plain";

  const result = await processFileAndStartChat(
    filePath,
    userQuery,
    responseType
  );

  res.send(result.response.text());
});

app.post(
  "/api/generateQuizQuestions",
  upload.single("file"),
  async (req, res) => {
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
    `;
    const responseType = "text/plain";

    const result = await processFileAndStartChat(
      filePath,
      userQuery,
      responseType
    );

    res.send(result.response.text());
  }
);

app.post("/api/generateRoadmap", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  console.log("inside backend");

  const filePath = req.file.path;
  const userQuery = `The file contains some subtopics of the main topic.
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
    }
    
    Do not inculde any other text other than the JSON response.`;

  try {
    const files = await handleFile(filePath);
    let response = await runGeminiRoadMapJSON(userQuery, files);

    console.log(typeof response);

    res.send(response);
  } catch (error) {
    console.error("Error processing file and starting chat session:", error);
  } finally {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
});

app.post(
  "/api/gradeMe",
  upload.fields([
    { name: "file1", maxCount: 1 },
    { name: "file2", maxCount: 1 },
  ]),
  async (req, res) => {
    if (!req.files["file1"][0] && !req.files["file2"][0]) {
      return res.status(400).send("No file uploaded.");
    } else if (!req.files["file1"][0] || !req.files["file2"][0]) {
      return res.status(400).send("Please upload both the files.");
    }

    const file1 = req.files["file1"][0];
    const file2 = req.files["file2"][0];

    const file1Path = file1.path;
    const file2Path = file2.path;

    const savePath = path.join(
      __dirname,
      "uploads",
      "My_document_and_the_rubric.pdf"
    );

    try {
      const { default: PDFMerger } = await import("pdf-merger-js");
      const merger = new PDFMerger();

      await merger.add(file1.path);
      await merger.add(file2.path);

      await merger.setMetadata({
        producer: "pdf-merger-js based script",
        author: "Schooly",
        creator: "Schooly",
        title: "My_document_and_the_rubric",
      });

      await merger.save(savePath);

      const userQuery = `The file contains my essay/homework/assignment and the rubric on which it would be graded by my teacher. 
        Act as an reviewer and please can you analyze it and return how I am performing? Take each point mentioned in the rubric and let me know how I am doing againt them.
        The review should be divided among following points: Grade me on each rubric out of 10, Positves in the work, Negatives/mistakes in the work, Suggestions to improve it, Overall Ananlysis.
        Also provide me the version of my document which shows all the Posistives, Negatives and the hypothetical suggestions that could be implemented (add the suggestions in parenthesis).  
        Please provide me the review in JSON format. Please provide an essay review in valid JSON format. Ensure all special characters within text strings are properly escaped, especially newlines and quotes. The JSON should include the following fields: 'gradeOnEachRubric', 'positives', 'negatives', 'suggestions', 'overall', and 'improvedVersion'.
        'gradeOnEachRubric' field should contain value as array of object, positives, negatives and suggestions should contain array of strings, overall and improved version should have markdown text.     
        Give the the review in neat and clean way by utilizing methods like bullet points, style the text as required. For bullet poitns try to use bullets rather than dash.
        Ideal JSON structure should be like below:
        {
          "gradeOnEachRubric": [
              {
                  "name": "Focus & Details",
                  "score": "8"
              },
              {
                  "name": "Organization",
                  "score": "9"
              },
              {
                  "name": "Voice",
                  "score": "9"
              },
              {
                  "name": "Word Choice",
                  "score": "9"
              },
              {
                  "name": "Sentence Structure, Grammar, Mechanics, & Spelling",
                  "score": "8"
              }
          ],        
          "positives": [
          "The essay showcases strong and engaging personal experiences that connect well with the intended audience.",
          "The writer demonstrates effective use of sensory details and evocative language, creating a vivid and immersive reading experience.",
          "The essay structure is well-organized, with a clear introduction, body paragraphs, and a strong conclusion. The transitions are smooth and guide the reader through the narrative smoothly.",
          "The writer demonstrates a solid command of grammar, punctuation, and sentence structure. The writing style is clear and concise, making it easy to follow the writer's thoughts and ideas.",
          "The essay demonstrates a strong command of vocabulary and a well-developed writing style.",
          "The writer effectively conveys a sense of personal reflection and growth, showcasing their evolution in thinking and understanding of the world."
        ],
        "negatives": [
          "The essay could benefit from a stronger, more specific thesis statement. It's clear what the central theme of the essay is, but a more concise statement of purpose would enhance its focus. [The first paragraph could begin with a more focused statement, like: \"I have always been a curious individual, always seeking to understand the world around me. My experiences at Mountain School helped me understand the value of introspection and the importance of finding my own path.\"]",
          "While the essay demonstrates a strong personal voice, the writer could further emphasize their unique perspective by incorporating more specific examples and anecdotes that reveal their individual personality and experiences. [The writer could explore more details about their specific interests, the specific challenges they faced at Mountain School, or any particular insights that they gained from the experiences.]",
          "The essay could benefit from more concrete examples to support some of the broader ideas and concepts discussed. [The essay discusses the value of introspection and the importance of finding one's own path. These ideas could be further strengthened by specific examples of how the writer applied these concepts in their daily life at Mountain School.]",
          "The essay could benefit from a more reflective conclusion that summarizes the key points and leaves the reader with a lasting impression. [The conclusion could provide a more detailed reflection on the overall impact of the experiences on the writer's personal development or future aspirations.]"
        ],
        "suggestions": [
          "Consider adding a specific thesis statement to clarify the essay's central argument. This will help the reader to understand the purpose of the essay from the beginning.",
          "Explore more specific examples and anecdotes that reveal your individual personality and experiences. This will make the essay more engaging and relatable to the reader.",
          "Provide more concrete examples to support your broader ideas and concepts. This will make your arguments more convincing and insightful.",
          "Consider a more reflective conclusion that summarizes the key points and leaves the reader with a lasting impression. This will ensure that your essay leaves a lasting impact on the reader."
        ],
        "overall": "This is a well-written and engaging essay that demonstrates strong writing skills and thoughtful reflection. The essay effectively conveys the writer's personal experiences and their journey of self-discovery. While there are a few areas for improvement, the essay overall showcases strong writing potential and a promising future for the writer.",
        "improvedVersion": "I sit, cradled by the two largest branches of the Newton Pippin Tree, watching the ether. The Green Mountains of Vermont stretch out indefinitely, and from my elevated vantage point, I feel as though we are peers, motionless in solidarity. I've lost my corporeal form and instead, while watching invisible currents drive white leviathans across the sky, have drifted up into the epistemological stream; completely alone with my questions, diving for answers. But a few months ago, I would have considered this an utter waste of time.\\n\\nI have always been a curious individual, always seeking to understand the world around me. My experiences at Mountain School helped me understand the value of introspection and the importance of finding my own path. [The first paragraph could begin with a more focused statement, like: \\\"I have always been a curious individual, always seeking to understand the world around me. My experiences at Mountain School helped me understand the value of introspection and the importance of finding my own path.\\\" ]\\n\\nPrior to attending Mountain School, my paradigm was substantially limited; opinions, prejudices, and ideas shaped by the testosterone-rich environment of Landon School. I was herded by result-oriented, fast-paced, technologically-reliant parameters towards psychology and neuroscience (the NIH, a mere 2.11 mile run from my school, is like a beacon on a hill). I was taught that one's paramount accomplishment should be specialization. Subconsciously I knew this was not who I wanted to be and seized the chance to apply to the Mountain School. Upon my arrival, though, I immediately felt I did not belong. I found the general atmosphere of hunky-dory acceptance foreign and incredibly unnerving.\\n\\nSo, rather than engage, I retreated to what was most comfortable: sports and work. In the second week, the perfect aggregate of the two, a Broomball tournament, was set to occur. Though I had never played before, I had a distinct vision for it, so decided to organize it.\\n\\nThat night, the glow-in-the-dark ball skittered across the ice. My opponent and I, brooms in hand, charged forward. We collided and I banana-peeled, my head taking the brunt of the impact. Stubborn as I was, even with a concussion, I wanted to remain in class and do everything my peers did, but my healing brain protested. My teachers didn't quite know what to do with me, so, no longer confined to a classroom if I didn't want to be, I was in limbo. I began wandering around campus with no company except my thoughts. Occasionally, Zora, my English teacher's dog, would tag along and we'd walk for miles in each other's silent company. Other times, I found myself pruning the orchard, feeding the school's wood furnaces, or my new favorite activity, splitting wood. Throughout those days, I created a new-found sense of home in my head.\\n\\n[The writer could explore more details about their specific interests, the specific challenges they faced at Mountain School, or any particular insights that they gained from the experiences. ]\\n\\nHowever, thinking on my own wasn't enough; I needed more perspectives. I organized raucous late-night discussions about everything from medieval war machines to political theory and randomly challenged my friends to \\\"say something outrageous and defend it.\\\" And whether we achieve profundity or not, I find myself enjoying the act of discourse itself. As Thoreau writes, \\\"Let the daily tide leave some deposit on these pages, as it leaves, the waves may cast up pearls.\\\" I have always loved ideas, but now understand what it means to ride their waves, to let them breathe and become something other than just answers to immediate problems.\\n\\n[The essay discusses the value of introspection and the importance of finding one's own path. These ideas could be further strengthened by specific examples of how the writer applied these concepts in their daily life at Mountain School.]\\n\\nI am most enamored by ideas that cultivate ingenious and practical enrichments for humanity. I enjoy picking some conundrum, large or small, and puzzling out a solution. Returning from a cross country meet recently, my friend and I, serendipitously, designed a socially responsible disposable water bottle completely on accident. Now we hope to create it.\\n\\nI am still interested in psychology and neuroscience, but also desire to incorporate contemplative thought into this work, analyzing enigmas from many different perspectives. My internships at the NIH and the National Hospital for Neuroscience and Neurosurgery in London have offered me valuable exposure to research and medicine. But I have come to realize that neither of my previous intended professions allow me to expand consciousness in the way I would prefer.\\n\\nAfter much soul-searching, I have landed on behavioral economics as the perfect synergy of the fields I love. All it took was a knock on the head.\\n\\n[The conclusion could provide a more detailed reflection on the overall impact of the experiences on the writer's personal development or future aspirations.]"      }
        `;
      const responseType = "application/json";

      const result = await processFileAndStartChat(
        savePath,
        userQuery,
        responseType
      );

      res.send(result.response.text());
    } catch (error) {
      console.error("Error processing files:", error);
      res.status(500).send({ message: "Error processing files." });
    } finally {
      if (fs.existsSync(file1Path)) {
        fs.unlinkSync(file1Path);
      }

      if (fs.existsSync(file2Path)) {
        fs.unlinkSync(file2Path);
      }
    }
  }
);

app.post("/api/generateLecture", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = req.file.path;
  const userQuery = `The file contains the lecture I want to teach today in the class. 
        Act as an teacher and please create a lecture structure and a presentation structure for me. Also, provide me real-life applications of the concepts, Analogies to make the topic simpler, any simple experiments with minimum requirements, fun facts about the topics I would teach. This is all for making it easier for the students to understand the topic. Additionally provide this information for each subtopic in the file.
        Please provide me the response in JSON format. Please provide an essay review in valid JSON format. Ensure all special characters within text strings are properly escaped, especially newlines and quotes. The JSON should include the following fields: 'lectureStructure', 'realExamples', 'analogies', 'suggestions', 'analogies', and 'funfacts'. The value of these fields should be in markdown format text.
        Give the the review in neat and clean way by utilizing methods like bullet points, style the text as required. For bullet poitns try to use bullets rather than dash.
        `;

  const responseType = "application/json";

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
