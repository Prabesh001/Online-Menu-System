import axios from "axios";
import {
  API_BASE_URL,
  API_TEAM_URL,
  API_HOME_MENU_URL,
  API_ORDER_URL,
  API_TRANSACTION_URL,
} from "./config.js";
import { base_url } from "../../../render.js";

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

  if (!tableNo) {
    console.error("Table number is missing, cannot update table.");
    return;
  }

  try {
    const response = await fetch(`${API_ORDER_URL}/${tableNo}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error("Failed to update table");
    }
    const data = await response.json();
    console.log("Table updated successfully:", data);
    return data;
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
export const fetchTransaction = async () => {
  return await fetchAction(`${API_TRANSACTION_URL}?limit=7`);
};

export const fetchTeams = async () => {
  return await fetchAction(`${API_TEAM_URL}`);
};

export const fetchHomeMenu = async () => {
  return await fetchAction(`${API_HOME_MENU_URL}`);
};

export const handlePost = async (url, postData) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Item added successfully:", data);
    } else {
      const error = await response.json();
      console.error("Error adding item:", error);
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

export const handleAllDelivery = async (item) => {
  return await handlePost(`${base_url}/api/homeMenu/transaction`, item);
};

export const handlePostUser = async (user) => {
  return await handlePost(`${base_url}/api/user`, user);
};
