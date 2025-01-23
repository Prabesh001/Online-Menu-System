import React, { useContext } from "react";
import "./add-to-cart.css";
import { MinusIcon, PlusIcon } from "lucide-react";
import { ItemContext, CartContext } from "../../App";

function AddToCart({ item, setItemSelected }) {
  const { setItems, setCartItems } = useContext(ItemContext);
  const { setCount, playAddToCartSound } = useContext(CartContext);
  console.log(item);

  const addToCart = (item) => {
    if (item.availability === false) {
      // toast.error(`${item.name} isn't available!`);
      return;
    } else {
      playAddToCartSound();

      const orderedTime = new Date().toLocaleTimeString();

      const itemsToAdd = Array.isArray(item)
        ? item.map((ele) => ({
            ...ele,
            quantity: ele.quantity || 1,
            orderedTime: [orderedTime],
            isDelivered: false,
          }))
        : [
            {
              ...item,
              quantity: item.quantity || 1,
              orderedTime: [orderedTime],
              isDelivered: false,
            },
          ];

      setCartItems((prevItems) => {
        const updatedCart = [...prevItems];

        itemsToAdd.forEach((newItem) => {
          const existingItemIndex = updatedCart.findIndex(
            (cartItem) => cartItem._id === newItem._id
          );

          if (existingItemIndex > -1) {
            updatedCart[existingItemIndex] = {
              ...updatedCart[existingItemIndex],
              quantity:
                updatedCart[existingItemIndex].quantity + newItem.quantity,
              orderedTime: [
                ...new Set([
                  ...newItem.orderedTime,
                  ...updatedCart[existingItemIndex].orderedTime,
                ]),
              ],
              isDelivered: false,
            };
          } else {
            updatedCart.push(newItem);
          }
        });

        const newCount = updatedCart.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        setCount(newCount);
        item.quantity = 1;
        // toast.success(`${item.name} added to the table.`)

        return updatedCart;
      });
    }
  };

  const handleAction = (action, itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId
          ? {
              ...item,
              quantity:
                action === "plus"
                  ? (item.quantity || 1) + 1
                  : Math.max((item.quantity || 0) - 1, 0),
            }
          : item
      )
    );
    setItemSelected((prevSelected) =>
      prevSelected && prevSelected._id === itemId
        ? {
            ...prevSelected,
            quantity:
              action === "plus"
                ? (prevSelected.quantity || 1) + 1
                : Math.max((prevSelected.quantity || 0) - 1, 0),
          }
        : prevSelected
    );
  };

  return (
    <div className="add-btn-group">
      <div className="set-item-quantity">
        <MinusIcon
          size="18px"
          cursor="pointer"
          color="gray"
          onClick={() => handleAction("minus", item._id)}
        />
        <input value={item.quantity || 1} readOnly />
        <PlusIcon
          size="18px"
          color="gray"
          cursor="pointer"
          onClick={() => handleAction("plus", item._id)}
        />
      </div>
      <button
        className="add-button no-select"
        onClick={() => {
          addToCart(item);
          setItemSelected([]);
        }}
      >
        <span>Add</span>
      </button>
    </div>
  );
}

export default AddToCart;
