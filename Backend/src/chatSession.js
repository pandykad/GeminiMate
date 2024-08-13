const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);


async function startChatSession(files, userQuery, responseType) {
    
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig : {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
            responseMimeType: responseType,
        }
    });

    const result = await model.generateContent([
        {
          fileData: {
            mimeType: files[0].mimeType,
            fileUri: files[0].uri
          }
        },
        { text: userQuery }
    ]);

    return result

    // const chatSession = model.startChat({
    //     generationConfig,
    //     history,
    // });

    // return chatSession;
}

const runGeminiRoadMapJSON = async (userQuery, files) => {
    let model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      // Set the `responseMimeType` to output JSON
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      }
    });
  
    console.log("inside runGeminiRoadMapJSON")
  
    let result = await model.generateContent([{
        fileData: {
          mimeType: files[0].mimeType,
          fileUri: files[0].uri
        }
      },
      { text: userQuery }])
    console.log(result.response.text());
    return result.response.text();
  }

module.exports = {
    startChatSession, runGeminiRoadMapJSON
};
