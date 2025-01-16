import React, { useContext, useEffect, useState } from "react";
import Popup from "../Components/Popup/index.jsx";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { CartContext } from "../App.jsx";
import "./Styles/cart.css";
import Payment from "./Payment/Payment.jsx";

function Cart({ items, setItems }) {
  const {
    count,
    setCount,
    popupVisiblilty,
    setPopupVisiblilty,
    coupen,
    playAddToCartSound,
    tableNumber,
    setTableNumber,
  } = useContext(CartContext);

  const [updateQuant, setUpdateQuant] = useState(1);
  const [currentItem, setCurrentItem] = useState(null);
  const navigate = useNavigate();

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  function removeFromCart(item) {
    const filteredItems = items.filter((ele) => ele.name !== item.name);
    setItems(filteredItems);

    const newCount = filteredItems.reduce(
      (acc, currentItem) => acc + currentItem.quantity,
      0
    );
    setCount(newCount);
  }

  function handleAddSub(action) {
    setUpdateQuant((prev) =>
      action === "add" ? prev + 1 : prev > 1 ? prev - 1 : prev
    );
  }

  function updateAmount(item) {
    setPopupVisiblilty("update");
    setUpdateQuant(item.quantity);
    setCurrentItem(item);
  }

  function handleUpdateQuantity() {
    if (currentItem) {
      const updatedItems = items.map((item) =>
        item.name === currentItem.name
          ? { ...item, quantity: updateQuant }
          : item
      );
      setItems(updatedItems);

      const newCount = updatedItems.reduce(
        (acc, currentItem) => acc + currentItem.quantity,
        0
      );
      setCount(newCount);
      playAddToCartSound();
      setPopupVisiblilty(false);
    }
  }

  function handleCloseButton() {
    navigate(-1);
  }

  const handleCheckOut = () => {
    setTableNumber(null);
    setCount(0);
    localStorage.clear();
    setItems([]);
    navigate("/");
  };

  const withCoupen = totalPrice - 0.03 * totalPrice;
  const withoutCoupen = totalPrice - 0.1 * totalPrice;

  const hrLine = <div style={{ borderTop: "1px solid lightgray" }}></div>;

  return (
    <div className="cart-overlay">
      <div className="cart-modal">
        <h2>Your Cart</h2>
        {hrLine}
        {items.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <ul className="items-list">
            {items.map((item, index) => (
              <li className="itemInCart" key={item.name}>
                {item.name} - Rs. {item.price}
                <div>
                  <label>
                    Quantity:
                    <input
                      type="text"
                      name={index}
                      id={index}
                      value={item.quantity}
                      style={{ textAlign: "center" }}
                      readOnly
                    />
                  </label>

                  <div className="edit-buttons">
                    <button
                      className="removeFromCart"
                      title="Delete from cart"
                      onClick={() => {
                        setPopupVisiblilty("delete");
                        setCurrentItem(item);
                      }}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="updateAmount"
                      title="Update quantity"
                      onClick={() => updateAmount(item)}
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button className="close-btn" onClick={handleCloseButton}>
          Close
        </button>
      </div>
      <div className="cart-modal price-modal">
        <center>
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            Table Number: {tableNumber}
          </span>
        </center>{" "}
        {hrLine}
        <span>No. of items: {count}</span>
        <span>Total Cost: Rs. {totalPrice}</span>
        <span>Discount: {coupen === "true" ? "10%" : "3%"}</span>
        <span>
          Final Price: Rs.
          {coupen === "true" ? withCoupen : withoutCoupen}
        </span>
        <hr />
        <Payment
          className="payment-btn"
          amount={coupen === "true" ? withCoupen : withoutCoupen}
        />
      </div>
      {popupVisiblilty === "update" && (
        <Popup
          greeting="Update"
          message={
            <>
              <p>
                Do you want to update <b>{currentItem.name}</b>'s quantity?
              </p>

              <div className="edit-item-quantity">
                <button
                  className="decrement"
                  style={{ backgroundColor: "red" }}
                  onClick={() => handleAddSub("sub")}
                >
                  -
                </button>
                <input
                  type="number"
                  style={{ maxWidth: "45px" }}
                  readOnly
                  value={updateQuant}
                />
                <button
                  className="increment"
                  onClick={() => handleAddSub("add")}
                >
                  +
                </button>
              </div>
            </>
          }
          addButtons={
            <button
              style={{ backgroundColor: "#266e19" }}
              className="update-amount-btn payment-btn"
              onClick={handleUpdateQuantity}
            >
              Update
            </button>
          }
        />
      )}
      {popupVisiblilty === "delete" && currentItem ? (
        <Popup
          greeting="WARNING!"
          message={
            <p>
              Are you sure you want to remove <b>{currentItem.name}</b> from
              cart?
            </p>
          }
          addButtons={
            <button
              className="del-from-cart-btn payment-btn"
              onClick={() => {
                removeFromCart(currentItem);
                setCurrentItem(null);
              }}
            >
              Delete
            </button>
          }
        />
      ) : null}
    </div>
  );
}

export default Cart;
