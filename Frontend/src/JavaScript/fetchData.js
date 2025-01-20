import axios from "axios";
import {
  API_BASE_URL,
  API_TEAM_URL,
  API_HOME_MENU_URL,
  API_ORDER_URL,
} from "./config.js";

const skipFetchRoutes = ["/", "/reserve-seat"];

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

export const updateTable = async (tableNo, updatedData) => {
  if (skipFetchRoutes.includes(location.pathname)) {
    return;
  }
  try {
    const response = await fetch(
      `${API_ORDER_URL}/${tableNo}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update table");
    }
    const data = await response.json();
  } catch (error) {
    console.error("Error updating table:", error);
  }
};

export const fetchItems = async () => {
  return await fetchAction(`${API_BASE_URL}`);
};

export const fetchOrders = async () => {
  return await fetchAction(`${API_ORDER_URL}`);
};

export const fetchTeams = async () => {
  return await fetchAction(`${API_TEAM_URL}`);
};

export const fetchHomeMenu = async () => {
  return await fetchAction(`${API_HOME_MENU_URL}`);
};
