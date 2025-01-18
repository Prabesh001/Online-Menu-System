import React, { useContext } from "react";
import { ItemContext } from "../../App";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// Create styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  table: {
    display: "table",
    width: "100%",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    borderBottom: 1,
    borderColor: "#000",
    padding: 8,
  },
  cell: {
    width: "33%",
    textAlign: "center",
    padding: 8,
  },
  header: {
    fontWeight: "bold",
    fontSize: 14,
  },
  totalRow: {
    marginTop: 10,
    fontWeight: "bold",
  },
  totalText: {
    textAlign: "right",
  },
});

function PaymentSuccess({ clearAll }) {
  const { cartItems } = useContext(ItemContext);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Create the PDF document
  const CartPDF = () => (
    <Document>
      <Page style={styles.page}>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>Cart Items</Text>

        <View style={styles.table}>
          {/* Header Row */}
          <View style={[styles.row, styles.header]}>
            <Text style={styles.cell}>Item Name</Text>
            <Text style={styles.cell}>Rate</Text>
            <Text style={styles.cell}>Quantity</Text>
          </View>

          {/* Table rows */}
          {cartItems.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>
                {(item.discountedPrice * item.quantity).toFixed(2)}
              </Text>
              <Text style={styles.cell}>{item.quantity}</Text>
            </View>
          ))}

          {/* Total Row */}
          <View style={styles.row}>
            <Text style={[styles.cell, styles.totalText]}>Total</Text>
            <Text style={styles.cell}>{totalPrice.toFixed(2)}</Text>
            <Text style={styles.cell}>{quantity}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

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
          <PDFDownloadLink document={<CartPDF />} fileName="cart_items.pdf">
            {({ loading }) =>
              loading ? "Loading document..." : "Download as PDF"
            }
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
}

export default PaymentSuccess;
