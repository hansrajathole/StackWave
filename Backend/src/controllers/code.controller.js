// /controllers/codeController.js
import axios from "axios"
import { languageMap } from "../utils/langMap.js";
import config from "../config/config.js";
export const runCode = async (req, res) => {
  const { code, language } = req.body;
  console.log(code , language);
  

  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: {
      base64_encoded: 'false',
      wait: 'true',
      fields: '*'
    },
    headers: {
      'x-rapidapi-key': config.JUDGE0_API_KEY ,
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      language_id: languageMap[language],
      source_code: code,
      stdin: ''
    }
  };
  
  async function fetchData() {
    try {
      const response = await axios.request(options);
      res.status(200).json({ message : "code run successfully", output : response.data})
    } catch (error) {
      console.error(error);
      res.status(500).json({ message : 'error in run code ' , error })
    }
  }
  
  fetchData()

}
