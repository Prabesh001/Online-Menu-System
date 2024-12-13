import React, { useEffect, useState } from "react";
import AddToCart from "../Components/AddToCart/index.jsx"
import axios from "axios";

function SearchItem({searchItem, setSearchItem, onAddToCart, handleSearch}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/menu")
      .then((response) => {
        const data = response.data
        const searchResultData = data.filter((item)=> item.name.toLowerCase().includes(searchItem.toLowerCase()))
        setItems(searchResultData)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, [searchItem]);

  return (
    <div>
      <p>Search Result for: {searchItem}</p>
      <ul className="item-list">
        {items.length > 0 && searchItem!= "" ? (
          items.map((item) => (
            <li key={item._id} className="item">
              <div className="item-info">
                <h3>{item.name}</h3>
                <span style={{color: "green", fontSize: "13px"}}>{item.category}</span>
                <p>{item.description}</p>
                <p>Rs. {item.price}</p>
              </div>
              <AddToCart
                onClick={() => onAddToCart(item)}
              />
            </li>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </ul>
    </div>
  )
}

export default SearchItem