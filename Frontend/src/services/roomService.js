import axios from "axios";

const API_URL = "http://localhost:3000/api";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const fetchRooms = async () => {
  try {
    const response = await axios.get(`${API_URL}/rooms`, getAuthHeader());
    return response.data?.rooms || [];
  } catch (error) {
    throw error;
  }
};

export const createRoom = async (roomData) => {
  try {
    const response = await axios.post(
      `${API_URL}/rooms`,
      roomData,
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const joinRoom = async (roomId) => {
  try {
    const response = await axios.patch(
      `${API_URL}/rooms/${roomId}`,
      { roomId },
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRoom = async (roomId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/rooms/${roomId}`,
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};