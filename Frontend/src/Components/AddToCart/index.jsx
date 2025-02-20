import React, { useContext } from "react";
import "./add-to-cart.css";
import { MinusIcon, PlusIcon } from "lucide-react";
import { ItemContext, CartContext } from "../../App";
import { toast } from "sonner";

function AddToCart({ item = {}, setItemSelected }) {
  const { setItems, setCartItems } = useContext(ItemContext);
  const { playAddToCartSound } = useContext(CartContext);

  // If item is null or undefined, return early
  if (!item || !item._id) return null;

  const addToCart = () => {
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
      const existingItem = prevItems.find(
        (cartItem) => cartItem._id === newItem._id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem._id === newItem._id
            ? {
                ...cartItem,
                quantity: (cartItem.quantity || 1) + newItem.quantity,
                orderedTime: [
                  ...new Set([...cartItem.orderedTime, ...newItem.orderedTime]),
                ],
              }
            : cartItem
        );
      } else {
        return [...prevItems, newItem];
      }
    });

    // Reset quantity
    setItems((prevItems) =>
      prevItems.map((i) =>
        i._id === item._id ? { ...i, quantity: 1 } : i
      )
    );

    toast.success(`${item.name} added to the table.`);
    setItemSelected([]);;
  };

  const handleAction = (action) => {
    setItems((prevItems) =>
      prevItems.map((i) =>
        i._id === item._id
          ? {
              ...i,
              quantity: Math.max((i.quantity || 1) + (action === "plus" ? 1 : -1), 1),
            }
          : i
      )
    );

    setItemSelected((prevSelected) =>
      prevSelected && prevSelected._id === item._id
        ? {
            ...prevSelected,
            quantity: Math.max((prevSelected.quantity || 1) + (action === "plus" ? 1 : -1), 1),
          }
        : prevSelected
    );
  };

  return (
    <div className="add-btn-group">
      <div className="set-item-quantity">
        <MinusIcon
          size="16px"
          cursor="pointer"
          color={item?.quantity === 1 ? "grey" : "#ff7a1c"}
          style={{ marginTop: "4px" }}
          onClick={() => handleAction("minus")}
        />
        <input
          value={item?.quantity || 1}
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
          onClick={() => handleAction("plus")}
        />
      </div>
      <button
        className="add-button no-select"
        onClick={addToCart}
      >
        <span>Add</span>
      </button>
    </div>
  );
}

export default AddToCart;
