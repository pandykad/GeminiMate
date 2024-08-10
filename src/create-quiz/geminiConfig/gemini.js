/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const apiKey = "AIzaSyBlFFYTCkFAVkCxKQOrMYBBbkYrRzYPGus";
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function runGemini(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  // console.log(result.response.text());

  return result.response.text();
}

const runGeminiImage = async (prompt, imageData) => {
  const result = await model.generateContent([
    prompt,
    imageData
  ]);

  // console.log(result.response.text());
  return result.response.text()
}

const runGeminiQuizAnalysis = async (prompt) => {
  const geminiQuizAnalysis = model.startChat({
    generationConfig,
    history: []
  })

  const result = await geminiQuizAnalysis.sendMessage(prompt);
  return result.response.text()
}

export {runGemini, runGeminiImage, runGeminiQuizAnalysis};
