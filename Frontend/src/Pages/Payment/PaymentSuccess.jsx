import React, { useContext } from "react";
import { ItemContext } from "../../App";
import { jsPDF } from "jspdf";

function PaymentSuccess({ clearAll }) {
  const { cartItems } = useContext(ItemContext);

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price).toFixed(0) * item.quantity, 0)
  const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Cart Items", 20, 20);

    // Add table header
    doc.setFontSize(12);
    doc.text("Item Name", 20, 30);
    doc.text("Rate", 80, 30);
    doc.text("Quantity", 120, 30);

    // Add table content
    cartItems.forEach((item, index) => {
      const y = 40 + index * 10;
      doc.text(item.name, 20, y);
      doc.text((item.discountedPrice * item.quantity).toFixed(2), 80, y);
      doc.text(item.quantity.toString(), 120, y);
    });

    // Add total row
    const y = 40 + cartItems.length * 10;
    doc.setFontSize(14);
    doc.text("Total", 20, y + 10);
    doc.text(totalPrice.toFixed(2), 80, y + 10);
    doc.text(quantity.toString(), 120, y + 10);

    // Save the document as PDF
    doc.save("cart_items.pdf");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "3px" }}>
      {cartItems.length === 0 ? (
        <p>Buy Something, dude!</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Rate</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{(item.discountedPrice * item.quantity).toFixed(2)}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
              <tr>
                <th>Total</th>
                <th>{totalPrice.toFixed(2)}</th>
                <th>{quantity}</th>
              </tr>
            </tbody>
          </table>
          <button onClick={downloadPDF}>Download as PDF</button>
        </div>
      )}
    </div>
  );
}

export default PaymentSuccess;
