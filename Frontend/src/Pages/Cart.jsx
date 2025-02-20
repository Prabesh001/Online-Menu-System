import React, { useContext, useEffect, useState } from "react";
import Popup from "../Components/Popup/index.jsx";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../App.jsx";
import "./Styles/cart.css";
import Payment from "./Payment/Payment.jsx";
import { fetchOrders } from "../JavaScript/fetchData.js";
import { MdOutlineTableBar } from "react-icons/md";

function Cart({ items, setItems }) {
  // useEffect(() => {
  //   const handleCartItems = async () => {
  //     const data = await fetchOrders();
  //     const myTable = data.filter((tab) => tab.table === tableNumber);
  //     setItems(myTable[0].orders);
  //     localStorage.setItem("CartItems", items)
  //   };
  //   handleCartItems();
  // }, []);

  // const totalPrice = items.reduce(
  //   (acc, item) => acc + item.price * item.quantity,
  //   0
  // );

  // function removeFromCart(item) {
  //   const filteredItems = items.filter((ele) => ele._id !== item._id);
  //   setItems(filteredItems);
  // }

  // function updateAmount(item) {
  //   setPopupVisiblilty("update");
  //   setUpdateQuant(item.quantity);
  //   setCurrentItem(item);
  // }

  // function handleUpdateQuantity() {
  //   if (currentItem) {
  //     const updatedItems = items.map((item) =>
  //       item.name === currentItem.name
  //         ? { ...item, quantity: updateQuant }
  //         : item
  //     );
  //     setItems(updatedItems);
  //     playAddToCartSound();
  //     setPopupVisiblilty(null);
  //   }
  // }

  // const handleCheckOut = () => {
  //   setTableNumber(null);
  //   setCount(0);
  //   localStorage.clear();
  //   setItems([]);
  //   navigate("/");
  // };

  function handleAddSub(action) {
    setUpdateQuant((prev) =>
      action === "add" ? prev + 1 : prev > 1 ? prev - 1 : prev
    );
  }
  const {
    popupVisiblilty,
    setPopupVisiblilty,
    coupen,
    playAddToCartSound,
    tableNumber,
  } = useContext(CartContext);

  const [updateQuant, setUpdateQuant] = useState(1);
  const [currentItem, setCurrentItem] = useState(null);
  const [deliveryItems, setDeliveryItems] = useState([]);
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(deliveryItems.reduce((acc, item) => acc + Number(item.quantity), 0));
  }, [deliveryItems]);

  useEffect(() => {
    const handleCartItems = async () => {
      const data = await fetchOrders();
      const myTable = data.find((tab) => tab.table === tableNumber);
      if (myTable) {
        setItems(myTable.orders || []);
        setDeliveryItems(myTable.deliveries || []);
        localStorage.setItem("CartItems", JSON.stringify(items));
      }
    };
    handleCartItems();
    setInterval(() => {
      window.location.reload();
    }, 30000);

    return () => clearInterval();
  }, []);

  const totalPrice = deliveryItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  const removeFromCart = (item) => {
    setItems((prevItems) => prevItems.filter((ele) => ele._id !== item._id));
  };

  const updateAmount = (item) => {
    setPopupVisiblilty("update");
    setUpdateQuant(item.quantity);
    setCurrentItem(item);
  };

  const handleUpdateQuantity = () => {
    if (currentItem) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.name === currentItem.name
            ? { ...item, quantity: updateQuant }
            : item
        )
      );
      playAddToCartSound();
      setPopupVisiblilty(null);
    }
  };

  function handleCloseButton() {
    navigate(-1);
  }

  const withCoupen = (totalPrice - 0.03 * totalPrice).toFixed(0);
  const withoutCoupen = (totalPrice - 0.1 * totalPrice).toFixed(0);

  const amount = coupen === "true" ? withCoupen : withoutCoupen;

  const hrLine = <div style={{ borderTop: "1px solid lightgray" }}></div>;

  return (
    <div className="cart-overlay">
      <div
        className="show-delivery"
        style={{
          position: "fixed",
          top: "55%",
          left: "92%",
          backgroundColor: "var(--theme-color)",
          padding: "8px",
          borderRadius: "50%",
          boxShadow: "1px 0 2px lightgray, -1px 0 2px lightgray",
          zIndex: "20",
        }}
        onClick={() => setPopupVisiblilty("delivery")}
      >
        <MdOutlineTableBar size={35} color="white" />
      </div>

      <div className="cart-modal">
        <h2>Your Cart</h2>
        {hrLine}
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
                    <input
                      type="text"
                      name={index}
                      id={index}
                      value={item.quantity}
                      style={{
                        userSelect: "none",
                        textAlign: "center",
                        border: "none",
                        backgroundColor: "transparent",
                        color: "#ff7a1c",
                      }}
                      readOnly
                    />
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
                      <u>Delete</u>
                    </button>
                    <button
                      className="updateAmount"
                      title="Update quantity"
                      onClick={() => updateAmount(item)}
                    >
                      <u>Edit</u>
                    </button>
                  </div>
                </div>
              </li>
            ))}
            <span style={{ color: "red" }}>
              Cost:{" "}
              {items.reduce((acc, item) => acc + Number(item.quantity) * Number(item.price), 0)}
            </span>
          </ul>
        )}

        <button className="close-btn" onClick={handleCloseButton}>
          Close
        </button>
      </div>

      {popupVisiblilty === "delivery" && (
        <div className="popup-overlay">
          <div
            className="cart-modal delivery-model"
            style={{ position: "relative" }}
          >
            <h2>Your Deliveries</h2>
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                backgroundColor: "red",
                color: "white",
                padding: "5px 18px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => setPopupVisiblilty(null)}
            >
              X
            </div>
            {hrLine}
            {deliveryItems.length === 0 ? (
              <p>Your table is empty!</p>
            ) : (
              <ul
                className="items-list"
                style={{ height: "500px", overflow: "scroll" }}
              >
                {deliveryItems.map((item, index) => (
                  <li className="itemInCart" key={index}>
                    {item.name} - Rs. {item.price}
                    <div>
                      <label>
                        Quantity:
                        <input
                          type="text"
                          name={index}
                          id={index}
                          value={item.quantity}
                          style={{
                            userSelect: "none",
                            textAlign: "center",
                            border: "none",
                            backgroundColor: "transparent",
                            color: "#ff7a1c",
                          }}
                          readOnly
                        />
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <div className="cart-modal price-modal">
        <center>
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            Table Number: {tableNumber}
          </span>
        </center>{" "}
        {hrLine}
        <center>
          <i style={{ color: "green" }}>(From Deliveries)</i>
        </center>
        <span>No. of items: {count}</span>
        <span>Total Cost: Rs. {totalPrice}</span>
        <span>Discount: {coupen === "true" ? "10%" : "3%"}</span>
        <span style={{ fontWeight: "bold", fontSize: "17px" }}>
          Final Price: Rs. {amount}
        </span>
        <hr />
        <Payment className="payment-btn" key={amount} amount={amount} />
      </div>

      {popupVisiblilty === "update" && (
        <Popup
          greeting="Update"
          message={
            <>
              <p>
                Do you want to update <b>{currentItem.name}</b>'s quantity?
              </p>

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
                  style={{ maxWidth: "45px", textAlign: "center" }}
                  readOnly
                  value={updateQuant}
                />
                <button
                  className="increment"
                  style={{ backgroundColor: "green" }}
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
        />
      )}

      {popupVisiblilty === "delete" && currentItem ? (
        <Popup
          greeting="WARNING!"
          message={
            <p>
              Are you sure you want to remove <b>{currentItem.name}</b> from
              cart?
            </p>
          }
          addButtons={
            <button
              className="del-from-cart-btn payment-btn"
              onClick={() => {
                removeFromCart(currentItem);
                setCurrentItem(null);
              }}
            >
              Delete
            </button>
          }
        />
      ) : null}
    </div>
  );
}

export default Cart;
