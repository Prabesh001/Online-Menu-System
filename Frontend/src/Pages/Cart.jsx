import React, { useContext, useEffect, useState } from "react";
import Popup from "../Components/Popup/index.jsx";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { CartContext } from "../App.jsx";
import "./Styles/cart.css";

function Cart({ items, setItems }) {
  const {
    count,
    setCount,
    popupVisiblilty,
    setPopupVisiblilty,
    closePopup,
    playAddToCartSound,
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
    closePopup();
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
      closePopup();
    }
  }

  function handleCloseButton() {
    navigate(-1);
  }

  const deleteClosePopup = () => {
    closePopup();
    setPopupVisiblilty(null);
    setCurrentItem(null);
  };

  return (
    <div className="cart-overlay">
      <div className="cart-modal">
        <h2>Your Cart</h2>
        <hr />
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
                    <input type="text" value={item.quantity} readOnly />
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
        <span>No. of items: {count}</span>
        <br />
        <span>Total Cost: Rs.{totalPrice}</span>
        <br />
        <span>Discount: 10%</span>
        <p>Final Price: Rs.{totalPrice - 0.1 * totalPrice}</p>
        <hr />
        <button
          className="payment-btn"
          onClick={() => {
            setPopupVisiblilty(true);
          }}
        >
          Payment
        </button>
      </div>
      {popupVisiblilty === true && (
        <Popup
          greeting="Payment"
          message="Do you want to check out?"
          addButtons={
            <button
              className="payment-btn"
              onClick={() => alert("Tussi ja rahe ho? Mat jaao.")}
            >
              Payment
            </button>
          }
          closePopup={closePopup}
        />
      )}
      {popupVisiblilty === "update" && (
        <Popup
          greeting="Update"
          message={
            <>
              <p>Do you want to update Item's quantity?</p>

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
          closePopup={closePopup}
        />
      )}
      {popupVisiblilty === "delete" && currentItem ? (
        <Popup
          greeting="WARNING!"
          message={
            <p>Are you sure you want to remove {currentItem.name} from cart?</p>
          }
          addButtons={
            <button
              className="del-from-cart-btn payment-btn"
              onClick={() => removeFromCart(currentItem)}
            >
              Delete
            </button>
          }
          closePopup={deleteClosePopup}
        />
      ) : null}
    </div>
  );
}

export default Cart;
