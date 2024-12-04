import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import "./Cart.css";

function Cart({ items, setItems, updateCartNo}) {
  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
  const navigate = useNavigate();

  function removeFromCart(item){
    const filteredItem = items.filter((ele,_)=>ele.name!=item.name)
    setItems(filteredItem)
    updateCartNo(filteredItem.length)
  }

  function handleCloseButton(){
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
          <ul>
            {items.map((item, index) => (
              
              <div className="itemInCart" key={index}>
                <li>
                  {item.name} - Rs. {item.price.toFixed(2)}
                </li>
                <button
                  className="removeFromCart"
                  onClick={()=>removeFromCart(item)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </ul>
        )}
        
        <button className="close-btn" onClick={handleCloseButton}>
          Close
        </button>
      </div>
      <div className="cart-modal price-modal">
        <span>No. of items: {items.length}</span>
        <br />
        <span>Total Cost: Rs.{totalPrice}</span>
        <br />
        <span>Discount: 10%</span>
        <p>Final Price: Rs.{totalPrice-( 0.1* totalPrice)}</p><hr />
        <button className="payment-btn">Payment</button>
      </div>
    </div>
  );
}

export default Cart;
