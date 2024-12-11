import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { CartContext } from "../../App.jsx";
import "./Cart.css";

function Cart({ items, setItems, setItemQuantity }) {
  const { count, setCount } = useContext(CartContext);
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

  function updateAmount(item) {
    const updatedItems = items.map((ele) =>
      ele.name === item.name
        ? { ...ele, quantity: Math.max(ele.quantity + 1, 1) }
        : ele
    );
    setItems(updatedItems);

    const newCount = updatedItems.reduce(
      (acc, currentItem) => acc + currentItem.quantity,
      0
    );
    setCount(newCount);
  }

  function handleCloseButton() {
    navigate(-1);
  }

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
              <div className="itemInCart" key={index}>
                <li>
                  {item.name} - Rs. {item.price.toFixed(2)}
                </li>
                <div>
                  <span>Quantity:</span>
                  <span>
                    <input type="text" value={item.quantity} readOnly />
                  </span>
                  <div className="edit-buttons">
                    <button
                      className="removeFromCart"
                      title="Delete from cart"
                      onClick={() => removeFromCart(item)}
                    >
                      <FaTrash style={{ fontSize: "20px" }} />
                    </button>
                    <button
                      className="updateAmount"
                      title="Update quantity"
                      onClick={() => updateAmount(item)}
                    >
                      <FaEdit style={{ fontSize: "20px" }} />
                    </button>
                  </div>
                </div>
              </div>
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
        <span>Total Cost: Rs.{totalPrice.toFixed(2)}</span>
        <br />
        <span>Discount: 10%</span>
        <p>Final Price: Rs.{(totalPrice - 0.1 * totalPrice).toFixed(2)}</p>
        <hr />
        <button className="payment-btn">Payment</button>
      </div>
    </div>
  );
}

export default Cart;
