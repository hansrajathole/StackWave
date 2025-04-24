import axios from "axios";

const API_URL = "http://localhost:3000/api";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const runCode = async (code, language) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/code/run`,
      { code, language },
      getAuthHeader()
    );
    return response.data.output;
  } catch (error) {
    throw error;
  }
};