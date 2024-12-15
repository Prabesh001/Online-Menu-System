import React, { useContext, useEffect, useState } from "react";
import Popup from "../Components/Popup/index.jsx";
import AddToCart from "../Components/AddToCart/index.jsx";
import axios from "axios";
import { CartContext } from "../App.jsx";
import { ItemContext } from "../App.jsx";

function SearchItem({ onAddToCart }) {
  const {popupVisiblilty, setPopupVisiblilty, closePopup} = useContext(CartContext)
  const { searchItem, setSearchItem, handleSearchItem} = useContext(ItemContext)
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // function handleSearch() {
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/menu")
      .then((response) => {
        const data = response.data;
        const searchResultData = data.filter((item) =>
          item.name.toLowerCase().includes(searchItem.toLowerCase())
        );
        searchResultData.forEach((element) => {
          if (element._id % 2 == 1) {
            element.availability = false;
          }
        });
        setItems(searchResultData);
        if(loading){
          return <p>Loading...</p>
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, [searchItem]);
  // }

  return (
    <div>
      <p>Search Result for: {searchItem}</p>
      <ul className="item-list">
        {items.length > 0 && searchItem != "" ? (
          items.map((item) => (
            <li key={item._id} className="item">
              <div className="item-info">
                <h3>{item.name}</h3>
                <span style={{ color: "grey", fontSize: "13px" }}>
                  {item.category}{" "}
                </span>
                <span style={{ fontSize: "13px", fontStyle: "italic" }}>
                  {item.availability ? (
                    <span style={{ color: "green" }}>(Available)</span>
                  ) : (
                    <span style={{ color: "red" }}>(Not Available)</span>
                  )}
                </span>
                <p>{item.description}</p>
                <p>Rs. {item.price}</p>
              </div>
              <AddToCart
                onClick={() => {
                  item.availability == true
                    ? onAddToCart(item)
                    : setPopupVisiblilty(true);
                }}
              />
            </li>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </ul>
      {popupVisiblilty == true && (
        <Popup
          message={<p>Item is not available!</p>}
          closePopup={closePopup}
        />
      )}
    </div>
  );
}

export default SearchItem;
