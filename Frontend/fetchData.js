import axios from 'axios';
import API_BASE_URL from "./config.js"

export const fetchItems = async () => {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
};
