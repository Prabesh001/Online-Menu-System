import React, { useContext } from "react";
import { ItemContext } from "../App";

function EmployeePage() {
  const { cartItems, setItems } = useContext(ItemContext);
  return (
    <div>
      <h1>Employee Page</h1>
      <h2>Items</h2>
      <ul>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <li key={item._id}>
              {item.name} - {item.quantity}
            </li>
          ))
        ) : (
          <p>No items found</p>
        )}
      </ul>
    </div>
  );
}

export default EmployeePage;
