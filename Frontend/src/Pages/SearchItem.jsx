import React, { useContext, useEffect } from "react";
import Popup from "../Components/Popup/index.jsx";
import AddToCart from "../Components/AddToCart/index.jsx";
import { fetchItems } from "../JavaScript/fetchData.js";
import { CartContext } from "../App.jsx";
import { ItemContext } from "../App.jsx";
import LoadingComponent from "../Components/Loading/loading.jsx";
import {Breadcrumbs, Typography} from "@mui/material";

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
  const {
    searchItem,
    setSelectedIndex,
    loading,
    setLoading,
    error,
    setError,
    items,
    setItems,
  } = useContext(ItemContext);

  useEffect(() => {
    setItems([]);
    setLoading(true);

    const getData = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Failed to load search items.", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
    setSelectedIndex(null);
  }, []);

  if (loading) {
    return <LoadingComponent mh={47}/>;
  }

  const performFuzzySearch = () => {
    if (!searchItem) return [];

    const searchResultData = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchItem.toLowerCase()) ||
        searchItem.toLowerCase().includes(item.name.toLowerCase())
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
    <div style={{ padding: "10px" }}>
      <Breadcrumbs separator={">"} aria-label="breadcrumb">
        search
        <Typography underline="hover" color="inherit" href="/search">
          Search
        </Typography>
        <Typography color="text.secondary">{searchItem}</Typography>
      </Breadcrumbs>
      <br />
      <ul className="item-list" style={{ minHeight: "47.5vh" }}>
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
