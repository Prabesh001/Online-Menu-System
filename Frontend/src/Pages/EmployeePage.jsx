import React, { useState, useContext } from "react";
import "./Styles/EmployeePage.css";
import { CartContext, ItemContext, AuthContext } from "../App";
import { Toaster, toast } from "sonner";
import LoadingComponent from "../Components/Loading/loading";
import Popup from "../Components/Popup";

function EmployeePage() {
  const { cartItems, loading, setLoading } = useContext(ItemContext);
  const { popupVisiblilty, setPopupVisiblilty } = useContext(CartContext);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const displayTime = (time) => {
    const date = new Date(time);

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const formattedTime = `${hours}:${minutes}:${seconds} ${period}`;
    return formattedTime;
  };

  function handleLogout() {
    setLoading(true);
    setTimeout(() => {
      setPopupVisiblilty(false);
      setLoading(false);
      setIsAuthenticated(false);
    }, 2000);
  }
  if (loading) {
    return <LoadingComponent />;
  }
  const styleButton = { backgroundColor: "red" };

  return (
    <div>
      <Toaster richColors />
      <h1>Orders</h1>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Ordered Time</th>
            <th>Delivery</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>
                  {item.orderedTime.map((element) => (
                    <div key={element}>{displayTime(element)}</div>
                  ))}
                </td>
                <td>
                  <button
                    className="close-btn"
                    onClick={() => toast.success("Delivered")}
                  >
                    Deliver
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" rowSpan="3" style={{ textAlign: "center" }}>
                No items found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
      <button
        className="close-btn"
        style={styleButton}
        onClick={() => setPopupVisiblilty(true)}
      >
        Logout
      </button>
      {popupVisiblilty && (
        <Popup
          greeting="Logout!"
          message={<p>Are you sure you want to Logout?</p>}
          addButtons={
            <button
              className="close-btn"
              style={styleButton}
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          }
        />
      )}
    </div>
  );
}

export default EmployeePage;
