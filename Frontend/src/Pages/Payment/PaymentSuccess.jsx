import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../App";
import { updateTable, fetchOrders } from "../../JavaScript/fetchData";
import ExcelJS from "exceljs";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import "./Payment.css";

// Styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  table: {
    display: "table",
    width: "100%",
    backgroundColor: "lightgray",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    borderColor: "#000",
    padding: 8,
  },
  cell: {
    width: "33%",
    textAlign: "center",
    fontSize: 16,
    padding: 8,
    flexWrap: "wrap",
  },
  header: {
    backgroundColor: "gray",
  },
  boldRow: {
    fontSize: 18,
    fontWeight: "bolder",
  },
});

function PaymentSuccess() {
  const [cartItems, setCartItems] = useState([]);
  const { tableNumber } = useContext(CartContext);
  const myItems = [];

  useEffect(() => {
    const handleCartItems = async () => {
      const data = await fetchOrders();
      const myTable = data.find((tab) => tab.table === tableNumber);
      if (myTable) {
        setCartItems(myTable.deliveries || []);
      }
    };
    handleCartItems();
  }, []);

  const handleAllDelivery = async (item) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/homeMenu/transaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Item added successfully:", data);
      } else {
        const error = await response.json();
        console.error("Error adding item:", error);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );

  const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Create PDF Document
  const CartPDF = () => (
    <Document>
      <Page style={styles.page}>
        <Text
          style={{
            fontSize: 22,
            marginBottom: 20,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          TableMate
        </Text>

        <View style={styles.table}>
          {/* Header Row */}
          <View style={[styles.row, styles.header]}>
            <Text style={[styles.cell, styles.boldRow]}>Item Name</Text>
            <Text style={[styles.cell, styles.boldRow]}>Quantity</Text>
            <Text style={[styles.cell, styles.boldRow]}>Price</Text>
          </View>

          {/* Table rows */}
          {cartItems.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>{item.quantity}</Text>
              <Text style={styles.cell}>
                {(item.discountedPrice * item.quantity).toFixed(0)}
              </Text>
            </View>
          ))}

          {/* Total Row */}
          <View style={[styles.row, styles.header]}>
            <Text style={[styles.cell, styles.boldRow]}>Total</Text>
            <Text style={[styles.cell, styles.boldRow]}>{quantity}</Text>
            <Text style={[styles.cell, styles.boldRow]}>
              {totalPrice.toFixed(0)}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  // Export to Excel
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("TableMate");

    // Add headers
    const headerRow = worksheet.addRow(["Item Name", "Quantity", "Price"]);
    headerRow.font = { bold: true };

    // Add cart data
    cartItems.forEach((item) => {
      worksheet.addRow([
        item.name,
        item.quantity,
        (item.discountedPrice * item.quantity).toFixed(0),
      ]);
    });

    // Add total row
    const totalRow = worksheet.addRow([
      "Total",
      quantity,
      totalPrice.toFixed(0),
    ]);
    totalRow.font = { bold: true };

    // Save the file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "TableMate.xlsx";
      link.click();
    });
  };

  cartItems.map(({ orderedTime, ...item }) => {
    myItems.push(item);
  });

  myItems.forEach(async (item) => await handleAllDelivery(item));

  useEffect(() => {
    const UpdateTable = async () => {
      if (!tableNumber) return; 
      try {
        await updateTable(tableNumber, {
          available: true,
          orders: [],
          deliveries: [],
        });
        console.log("Table updated successfully");
      } catch (error) {
        console.error("Failed to update table:", error);
      }
    };
    UpdateTable();
    
    const timer1 = setTimeout(() => {
      localStorage.clear();
    }, 6000);
  
    return () => clearTimeout(timer1);
  }, [tableNumber]); 
  

  return (
    <div className="payment-page">
      {cartItems.length === 0 ? (
        <p>Buy Something, dude!</p>
      ) : (
        <div>
          <center>
            <i style={{ color: "green", margin: "10px" }}>
              Thank You for stopping By🙏🙏🙏!
            </i>
            <h1>TableMate</h1>
          </center>
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{(item.discountedPrice * item.quantity).toFixed(0)}</td>
                </tr>
              ))}
              <tr>
                <th>Total</th>
                <th>{quantity}</th>
                <th>{totalPrice.toFixed(0)}</th>
              </tr>
            </tbody>
          </table>

          {/* PDF Download Link */}
          <PDFDownloadLink document={<CartPDF />} fileName="TableMate.pdf">
            {({ loading }) =>
              loading ? (
                <button className="download-btn"> Loading...</button>
              ) : (
                <button className="download-btn"> Download as Pdf </button>
              )
            }
          </PDFDownloadLink>
          <button onClick={exportToExcel} className="download-btn">
            Download as Excel
          </button>
        </div>
      )}
    </div>
  );
}

export default PaymentSuccess;
