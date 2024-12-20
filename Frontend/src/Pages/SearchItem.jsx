import React, { useContext, useEffect, useState } from "react";
import Popup from "../Components/Popup/index.jsx";
import AddToCart from "../Components/AddToCart/index.jsx";
import API_BASE_URL from "../../config.js"
import axios from "axios";
import { CartContext } from "../App.jsx";
import { ItemContext } from "../App.jsx";
import LoadingComponent from "../Components/Loading/loading.jsx";

// Levenshtein Distance for Fuzzy Search
function levenshteinDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[a.length][b.length];
}

function SearchItem({ onAddToCart }) {
  const { popupVisiblilty, setPopupVisiblilty, closePopup } =
    useContext(CartContext);
  const { searchItem, setSelectedIndex } = useContext(ItemContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}`)
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
      setSelectedIndex(null)
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  const performFuzzySearch = () => {
    if (!searchItem) return [];

    const searchResultData = items.filter((item) =>
      item.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    
    if (searchResultData.length != 0) {
      return searchResultData;
    } else {
      return items
        .map((item) => ({
          ...item,
          distance: levenshteinDistance(
            searchItem.toLowerCase(),
            item.name.toLowerCase()
          ),
        }))
        .filter((item) => item.distance <= 2) // Allow matches within 2 edits
        .sort((a, b) => a.distance - b.distance);
    }
  };

  const filteredItems = performFuzzySearch();

  return (
    <div>
      <p>Search Result for: {searchItem}</p>
      <ul className="item-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <li key={item._id} className="item">
              <div className="item-info">
                <h3>{item.name}</h3>
                <span style={{ color: "grey", fontSize: "13px" }}>
                  {item.category}
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
                  item.availability
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
      {popupVisiblilty && (
        <Popup
          message={<p>Item is not available!</p>}
          closePopup={closePopup}
        />
      )}
    </div>
  );
}

export default SearchItem;
