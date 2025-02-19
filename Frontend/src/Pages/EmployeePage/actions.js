import axios from "axios";

export const deleteDelivery = async (id) => {
  try {
    const response = await axios.delete(`${student_url}/${id}`);

    if (response.status !== 200) {
      throw new Error("Failed to delete item");
    }
  } catch (error) {
    console.error("Error deleting item", error);
  }
};