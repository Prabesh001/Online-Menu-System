import React, { useContext } from "react";
import { ItemContext } from "../../App";
import ExcelJS from "exceljs";
import fs from "file-saver"; // for saving the file in the browser

function PaymentSuccess({ clearAll }) {
  const { cartItems } = useContext(ItemContext);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.price).toFixed(0) * item.quantity,
    0
  );
  const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const downloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Cart Items");
  
    // Add columns to the worksheet
    worksheet.columns = [
      { header: "Item Name", key: "name", width: 30 },
      { header: "Rate", key: "rate", width: 15 },
      { header: "Quantity", key: "quantity", width: 10 },
    ];
  
    // Bold the header row
    worksheet.getRow(1).font = { bold: true };
  
    // Add rows for each item in the cart
    cartItems.forEach((item) => {
      worksheet.addRow({
        name: item.name,
        rate: item.discountedPrice * item.quantity,
        quantity: item.quantity,
      });
    });
  
    // Add the total row
    const totalRow = worksheet.addRow({
      name: "Total",
      rate: totalPrice,
      quantity: quantity,
    });
  
    // Bold the total row
    totalRow.font = { bold: true };
  
    // Save the workbook to a file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    fs.saveAs(blob, "cart_items.xlsx");
  };
  

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "3px" }}>
      {cartItems.length === 0 ? (
        <p>Buy Something dude!</p>
      ) : (
        <>
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
                  <td>{item.discountedPrice * item.quantity}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
              <tr>
                <th>Total</th>
                <th>{totalPrice}</th>
                <th>{quantity}</th>
              </tr>
            </tbody>
          </table>
          <button onClick={downloadExcel}>Download Excel</button>
        </>
      )}
    </div>
  );
}

export default PaymentSuccess;
