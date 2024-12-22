import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AddToCart from "../Components/AddToCart";
import Popup from "../Components/Popup";
import "./Styles/FoodCategory.css";
import { CartContext, ItemContext } from "../App";
import LoadingComponent from "../Components/Loading/loading";
import { fetchItems } from "../../fetchData.js";

function FoodCategory({ onAddToCart }) {
  const {
    setSelectedIndex,
    loading,
    setLoading,
    error,
    setError,
    items,
    setItems,
  } = useContext(ItemContext);
  const { popupVisiblilty, setPopupVisiblilty, closePopup } =
    useContext(CartContext);
  const { category } = useParams(); // Get the category from the URL params

  useEffect(() => {
    setItems([]);
    setLoading(true);
    setError(null);

    const getData = async () => {
      try {
        const data = await fetchItems();
        const filteredData =
          category === "All"
            ? data
            : data.filter((item) => item.category === category);

        const filteredItems = filteredData.map((ele) => ({
          ...ele,
          isVeg: true,
        }));

        filteredItems.forEach((element) => {
          const nonveg = ["chicken", "fish", "sekuwa", "buff", "egg", "prawn", "mutton"];
          if (element._id % 2 === 1) {
            element.availability = false;
          }

          const nonVegItem = nonveg.some(item => element.name.toLowerCase().includes(item))
          if(nonVegItem){
            element.isVeg = false;
          }
        });

        setItems(filteredItems);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Failed to load menu items.");
      } finally {
        setLoading(false);
      }
    };

    getData();
    setSelectedIndex(category);
  }, [category]);

  if (loading) {
    return <LoadingComponent />;
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
            <li key={item._id} className="item" title={item.isVeg? "Veg": "Non-veg"}>
              <div className="item-info">
                <h3>{item.name}</h3>
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
          <p>No items found in this category.</p>
        )}
      </ul>
      {popupVisiblilty && (
        <Popup
          greeting="Sorry!"
          message={<p>Item is not available!</p>}
          closePopup={closePopup}
        />
      )}
    </div>
  );
}

export default FoodCategory;
