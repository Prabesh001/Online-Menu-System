import axios from "axios";
import { API_BASE_URL, API_TEAM_URL , API_HOME_MENU_URL} from "./config.js";

const fetchAction = async (url) => {
  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};

// Define fetchItems and fetchTeams as asynchronous functions
export const fetchItems = async () => {
  return await fetchAction(`${API_BASE_URL}`);
};

export const fetchTeams = async () => {
  return await fetchAction(`${API_TEAM_URL}`);
};

export const fetchHomeMenu = async () => {
  return await fetchAction(`${API_HOME_MENU_URL}`);
};
