// /controllers/codeController.js
import axios from "axios"
import { languageMap } from "../utils/langMap.js";
import config from "../config/config.js";
export const runCode = async (req, res) => {
  const { code, language } = req.body;
  console.log(code , language);
  

  try {
    const response = await axios.post(
      `${config.JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
      {
        source_code: code,
        language_id: languageMap[language],
      },
      {
        headers: {
          "X-RapidAPI-Key": config.JUDGE0_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );

    const result = response.data;

    res.json({
      stdout: result.stdout,
      stderr: result.stderr,
      time: result.time,
      memory: result.memory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Code execution failed" });
  }
};
