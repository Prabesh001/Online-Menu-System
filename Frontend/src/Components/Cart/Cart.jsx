import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaSync, FaRedo, FaArrowCircleUp, FaEdit } from "react-icons/fa";
import "./Cart.css";

function Cart({ items, setItems, updateCartNo, setItemQuantity }) {
  const totalPrice = items.reduce((acc, item) => acc + (item.price*item.quantity), 0);
  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();

  function removeFromCart(item) {
    const filteredItem = items.filter((ele, _) => ele.name != item.name);
    setItems(filteredItem);
    updateCartNo(filteredItem.length);
  }

  function updateAmount(item){
    setItemQuantity(item.quantity++)
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
                  <span> <input type="text" value={item.quantity} readOnly/></span>
                  <div className="edit-buttons">
                    <button
                      className="removeFromCart"
                      title="Delete from cart"
                      onClick={() => removeFromCart(item)}
                    >
                      <FaTrash style={{ fontSize: "20px" }} />
                    </button>
                    <button className="updateAmount"
                    title="Update quantity"
                    onClick={()=>updateAmount(item)}>
                    <FaSync style={{ fontSize: "20px"}} />
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
        <span>No. of items: {totalCount}</span>
        <br />
        <span>Total Cost: Rs.{totalPrice}</span>
        <br />
        <span>Discount: 10%</span>
        <p>Final Price: Rs.{totalPrice - 0.1 * totalPrice}</p>
        <hr />
        <button className="payment-btn">Payment</button>
      </div>
    </div>
  );
}

export default Cart;
