import React, { useContext } from "react";
import "./add-to-cart.css";
import { MinusIcon, PlusIcon } from "lucide-react";
import { ItemContext, CartContext } from "../../App";
import { toast } from "sonner";

function AddToCart({ item, setItemSelected }) {
  const { setItems, setCartItems } = useContext(ItemContext);
  const { playAddToCartSound } = useContext(CartContext);

  const addToCart = (item) => {
    if (!item.availability) {
      toast.error(`${item.name} isn't available!`);
      return;
    }
    playAddToCartSound();
    const orderedTime = new Date().toLocaleTimeString();
    const newItem = {
      ...item,
      quantity: item.quantity || 1,
      orderedTime: [orderedTime],
      isDelivered: false,
    };

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem._id === newItem._id);
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        existingItem.orderedTime = [...new Set([...existingItem.orderedTime, ...newItem.orderedTime])];
      } else {
        prevItems.push(newItem);
      }
      item.quantity = 1;
      toast.success(`${item.name} added to the table.`);
      return [...prevItems];
    });
  };

  const handleAction = (action, itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId
          ? { ...item, quantity: Math.max((item.quantity || 1) + (action === "plus" ? 1 : -1), 1) }
          : item
      )
    );
    setItemSelected((prevSelected) =>
      prevSelected && prevSelected._id === itemId
        ? { ...prevSelected, quantity: Math.max((prevSelected.quantity || 1) + (action === "plus" ? 1 : -1), 1) }
        : prevSelected
    );
  };

  return (
    <div className="add-btn-group">
      <div className="set-item-quantity">
        <MinusIcon
          size="16px"
          cursor="pointer"
          color={item.quantity === 1 ? "grey" : "#ff7a1c"}
          style={{ marginTop: "4px" }}
          onClick={() => handleAction("minus", item._id)}
        />
        <input
          value={item.quantity || 1}
          readOnly
          style={{
            userSelect: "none",
            pointerEvents: "none",
            border: "none",
            color: "#ff7a1c",
          }}
        />
        <PlusIcon
          size="16px"
          color="#ff7a1c"
          cursor="pointer"
          style={{ marginTop: "4px" }}
          onClick={() => handleAction("plus", item._id)}
        />
      </div>
      <button
        className="add-button no-select"
        onClick={() => {
          addToCart(item);
          setItemSelected(null);
        }}
      >
        <span>Add</span>
      </button>
    </div>
  );
}

export default AddToCart;
