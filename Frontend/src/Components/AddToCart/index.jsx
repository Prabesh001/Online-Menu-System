import React from "react";
import "./add-to-cart.css";

function AddToCart({ onClick }) {
  return (
    <div>
      <button className="add-button no-select" onClick={onClick}>
        <span>Add</span>
      </button>
    </div>
  );
}

export default AddToCart;
