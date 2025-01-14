import axios from "axios";
import API_BASE_URL from "./config.js";

export const fetchItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};
