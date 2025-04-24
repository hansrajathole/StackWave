import axios from "axios";

const API_URL = "http://localhost:3000";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const fixCode = async (code) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/ai/fix`,
      { code },
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const generateCode = async (prompt) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/ai/generatecode`,
      { prompt },
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};