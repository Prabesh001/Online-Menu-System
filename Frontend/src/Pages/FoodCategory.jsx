import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AddToCart from "../Components/AddToCart";
import Popup from "../Components/Popup";
import "./Styles/FoodCategory.css";
import { CartContext, ItemContext } from "../App";
import LoadingComponent from "../Components/Loading/loading";
import { fetchItems } from "../JavaScript/fetchData";
import { Toaster, toast } from "sonner";
import Card from "../Components/Card";

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
  const { popupVisiblilty, setPopupVisiblilty } = useContext(CartContext);
  const { category } = useParams(); // Get the category from the URL params

  const [itemSelected, setItemSelected] = useState([]);
  console.log(itemSelected.length)

  useEffect(() => {
    if (itemSelected.length===0) {
      document.body.style.overflow= "auto"
    }
    else{
      document.body.style.overflow= "hidden"
    }
  }, [itemSelected]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setItems([]);

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
          const nonveg = [
            "chicken",
            "fish",
            "sekuwa",
            "buff",
            "egg",
            "prawn",
            "mutton",
          ];
          if (element._id % 2 === 1) {
            element.availability = false;
          }

          const nonVegItem = nonveg.some((item) =>
            element.name.toLowerCase().includes(item)
          );
          if (nonVegItem) {
            element.isVeg = false;
          }
        });

        // const filteredItems = data.filter((ele) => ele.availability ===true);
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

  if (error) {
    return <div className="loading-failed">{error}</div>;
  }

  const handleAction = (action, itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId
          ? {
              ...item,
              quantity:
                action === "plus"
                  ? (item.quantity || 1) + 1
                  : Math.max((item.quantity || 0) - 1, 0),
            }
          : item
      )
    );
  };

  const addToCartError = () => {
    setPopupVisiblilty(true);
    toast.error("Sorry, Item is not available.");
  };
  const addToCartSuccess = (element) => {
    onAddToCart(element);
    element.quantity = 1;
    console.log("success");
    toast.success(element.name + " added to Table.");
  };

  return (
    <div className="food-category">
      <h2 className="category-title">{category}</h2>
      <Toaster richColors position="bottom-center" />
      {loading ? (
        <LoadingComponent mh={50} />
      ) : (
        <ul className="item-list">
          {items.length > 0 ? (
            items.map((item) => (
              <li
                key={item._id}
                className="item"
                title={item.isVeg ? "Veg" : "Non-veg"}
                onDoubleClick={() => setItemSelected(item)}
              >
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <span style={{ fontSize: "13px", fontStyle: "italic" }}>
                    {item.availability ? (
                      <span style={{ color: "green" }} className="no-select">
                        (Available)
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>(Not Available)</span>
                    )}
                  </span>
                  <p className="no-select">{item.description}</p>
                  <p>Rs. {item.price}</p>
                </div>
                <AddToCart
                  onClick={() => {
                    item.availability === true
                      ? addToCartSuccess(item)
                      : addToCartError();
                  }}
                  forMinus={() => handleAction("minus", item._id)}
                  forPlus={() => handleAction("plus", item._id)}
                  forInput={item.quantity || 1}
                />
              </li>
            ))
          ) : (
            <p>No items found in this category.</p>
          )}
          {itemSelected.length === 0 ? null : (
            <Card
              itemSelected={itemSelected}
              setItemSelected={setItemSelected}
            />
          )}
        </ul>
      )}
      {popupVisiblilty && (
        <Popup greeting="Sorry!" message={<p>Item is not available!</p>} />
      )}
    </div>
  );
}

export default FoodCategory;
