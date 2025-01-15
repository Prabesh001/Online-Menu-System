import React from "react";
import "./add-to-cart.css";

function AddToCart({onClick}) {
  return (
    <div>
      <button
        className="add-button no-select"
        onClick={onClick}
      >
        Add
      </button>
    </div>
  );
}

export default AddToCart;
