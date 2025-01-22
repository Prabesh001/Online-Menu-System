import React from "react";
import "./add-to-cart.css";
import { MinusIcon, PlusIcon } from "lucide-react";

function AddToCart({ onClick, forMinus,forPlus, forInput }) {
  return (
    <div className="add-btn-group">
      <div className="set-item-quantity">
        <MinusIcon
          size="18px"
          cursor="pointer"
          color="gray"
          onClick={forMinus}
        />
        <input value={forInput || 1} readOnly/>
        <PlusIcon
          size="18px"
          color="gray"
          cursor="pointer"
          onClick={forPlus}
        />
      </div>
      <button className="add-button no-select" onClick={onClick}>
        <span>Add</span>
      </button>
    </div>
  );
}

export default AddToCart;
