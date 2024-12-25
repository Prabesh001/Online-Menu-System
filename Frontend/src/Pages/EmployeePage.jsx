import React, { useState, useContext } from "react";
import "./Styles/EmployeePage.css";
import { ItemContext } from "../App";
import { Toaster, toast } from "sonner";

function EmployeePage() {
  const { cartItems } = useContext(ItemContext);

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

  return (
    <div>
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
                    <div>{displayTime(element)}</div>
                  ))}
                </td>
                <td>
                  <Toaster richColors/>
                  <button className="close-btn" onClick={() => toast.success("Delivered")}>
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
    </div>
  );
}

export default EmployeePage;
