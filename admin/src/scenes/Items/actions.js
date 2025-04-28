import { toast } from "react-toastify";
import { base_url } from "../../../../render";

const BASE_URL = `${base_url}/api/menu`;

// Toggle Availability
export const handleToggleClick = async (id, currentStatus, setItems) => {
  const updatedStatus = !currentStatus;

  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ availability: updatedStatus }),
    });

    if (!response.ok) throw new Error(`Failed to update availability (Status: ${response.status})`);

    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, availability: updatedStatus } : item
      )
    );
    toast.success("Availability updated!");
  } catch (error) {
    toast.error("Error updating availability");
    console.error("Update Error:", error);
  }
};

// Delete Item
export const handleDeleteClick = async (id, name, setItems) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });

    if (!response.ok) throw new Error(`Failed to delete item (Status: ${response.status})`);

    setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    toast.success(`Item deleted: ${name}`);
  } catch (error) {
    toast.error("Error deleting item");
    console.error("Delete Error:", error);
  }
};
