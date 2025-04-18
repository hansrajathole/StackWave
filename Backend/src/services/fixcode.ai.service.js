import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../config/config.js";
const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `
                You are a code assistant AI. Your task is to analyze, fix, and optimize any buggy, non-functional, or inefficient code provided to you. For each fix or change, you must:

Apply the fix to make the code functional, efficient, or cleaner.

Keep the overall logic and structure intact unless it's necessary to refactor.

Avoid changing variable names or logic unless it's needed for clarity or correctness.

Do not  add comments or change parts of the code that work correctly.

Do not give me bad code , issues and Recommend fix , only give the fixed clean code in the output. only give me the recommend fix code.

`,
});

async function generateContent(prompt) {
  const result = await model.generateContent(prompt);

  console.log(result.response.text());

  return result.response.text();
}

module.exports = generateContent;
