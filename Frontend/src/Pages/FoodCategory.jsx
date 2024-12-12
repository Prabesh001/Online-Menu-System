import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddToCart from "../Components/AddToCart";
import "./Styles/FoodCategory.css";

function FoodCategory({ onAddToCart }) {
  const { category } = useParams(); // Get the category from the URL params
  const [items, setItems] = useState([]); // Items state to hold menu items
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get("http://localhost:5000/api/menu")
      .then((response) => {
        const filteredItems =
          category === "All"
            ? response.data
            : response.data.filter((item) => item.category === category);

        setItems(filteredItems);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError("Failed to load menu items.");
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="food-category">
      <h2 className="category-title">{category}</h2>
      <ul className="item-list">
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item._id} className="item">
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Rs. {item.price}</p>
              </div>
              <AddToCart
                onClick={() => onAddToCart(item)}
              />
            </li>
          ))
        ) : (
          <p>No items found in this category.</p>
        )}
      </ul>
    </div>
  );
}

export default FoodCategory;
