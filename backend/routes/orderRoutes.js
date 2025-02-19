const express = require("express");
const router = express.Router();
const { Orders, Item } = require("../schemas");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const table = await Orders.find();
    res.json(table);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// router.put("/move-order", async (req, res) => {
//   const { orderId, selectedTable } = req.body;

//   try {
//     // Find the table that contains the order
//     const objectId = new mongoose.Types.ObjectId(orderId);
//     const table = await Orders.findOne({ table: selectedTable });
//     if (!table) return res.status(404).json({ message: "Order not found" });

//     // Find the order inside the orders array
//     const orderToMove = table.orders.find(
//       (order) => order._id.toString() === orderId
//     );
//     if (!orderToMove)
//       return res.status(404).json({ message: "Order not found" });

//     console.log("Order to move:", orderToMove);
//     // Update the document: Remove from orders & Add to deliveries
//     const updatedTable = await Orders.findOneAndUpdate(
//       { table: selectedTable },
//       {
//         $pull: { orders: { _id: orderId } }, // Remove from orders array
//         $push: { deliveries: orderToMove }, // Add to deliveries array
//       },
//       { new: true }
//     );

//     if (!updatedTable)
//       return res.status(500).json({ message: "Failed to update table" });

//     console.log("Updated Table:", updatedTable);
//     res.status(200).json({ message: "Order moved successfully", updatedTable });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });


// router.put("/move-order", async (req, res) => {
//   const { orderId, selectedTable, deliveredAmount } = req.body;

//   try {
//     // Find the table that contains the order
//     const table = await Orders.findOne({ table: selectedTable });
//     if (!table) return res.status(404).json({ message: "Table not found" });

//     // Find the order inside the orders array
//     const orderToMove = table.orders.find(
//       (order) => order._id.toString() === orderId
//     );
//     if (!orderToMove)
//       return res.status(404).json({ message: "Order not found" });

//     // Check if it's a full delivery or partial delivery
//     if (deliveredAmount >= orderToMove.quantity) {
//       // Full delivery: Remove the entire order from orders array and add the full order to deliveries array
//       const updatedTable = await Orders.findOneAndUpdate(
//         { table: selectedTable },
//         {
//           $pull: { orders: { _id: orderId } }, // Remove the entire order from orders array
//           $push: { deliveries: orderToMove }, // Add the entire order to deliveries array
//         },
//         { new: true }
//       );

//       if (!updatedTable)
//         return res.status(500).json({ message: "Failed to update table" });

//       return res.status(200).json({
//         message: "Full order delivered and moved successfully",
//         updatedTable,
//       });
//     } else {
//       // Partial delivery: Only reduce the quantity in the orders array by the delivered amount
//       const updatedOrders = table.orders.map((order) =>
//         order._id.toString() === orderId
//           ? { ...order, quantity: order.quantity - deliveredAmount } // Reduce quantity for partial delivery
//           : order
//       );

//       // Add partial delivery to deliveries array
//       const updatedTable = await Orders.findOneAndUpdate(
//         { table: selectedTable },
//         {
//           orders: updatedOrders, // Update the orders array with the reduced quantity
//           $push: { deliveries: { ...orderToMove, quantity: deliveredAmount } }, // Add partial delivery to deliveries array
//         },
//         { new: true }
//       );

//       if (!updatedTable)
//         return res.status(500).json({ message: "Failed to update table" });

//       return res.status(200).json({
//         message: "Partial delivery completed successfully",
//         updatedTable,
//       });
//     }
//   } catch (error) {
//     console.error("Server Error:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// });


router.put("/move-order/full-delivery", async (req, res) => {
  const { orderId, selectedTable } = req.body;

  try {
    // Find the table that contains the order
    const table = await Orders.findOne({ table: selectedTable });
    if (!table) return res.status(404).json({ message: "Table not found" });

    // Find the order inside the orders array
    const orderToMove = table.orders.find(
      (order) => order._id.toString() === orderId
    );
    if (!orderToMove)
      return res.status(404).json({ message: "Order not found" });

    console.log("Order to move:", orderToMove);

    // Full delivery: Remove the entire order from orders array and add the full order to deliveries array
    const updatedTable = await Orders.findOneAndUpdate(
      { table: selectedTable },
      {
        $pull: { orders: { _id: orderId } }, // Remove the entire order from orders array
        $push: { deliveries: orderToMove }, // Add the entire order to deliveries array
      },
      { new: true }
    );

    if (!updatedTable)
      return res.status(500).json({ message: "Failed to update table" });

    console.log("Updated Table:", updatedTable);
    res.status(200).json({ message: "Full order delivered and moved successfully", updatedTable });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.put("/move-order/partial-delivery", async (req, res) => {
  const { orderId, selectedTable, deliveredAmount } = req.body;

  try {
    // Find the table that contains the order
    const table = await Orders.findOne({ table: selectedTable });
    if (!table) return res.status(404).json({ message: "Table not found" });

    // Find the order inside the orders array
    const orderToMove = table.orders.find(
      (order) => order._id.toString() === orderId
    );
    if (!orderToMove)
      return res.status(404).json({ message: "Order not found" });

    // Partial delivery: Reduce the quantity of the order and add to deliveries
    if (deliveredAmount < orderToMove.quantity) {
      // Reduce quantity for partial delivery
      const updatedOrders = table.orders.map((order) =>
        order._id.toString() === orderId
          ? { ...order, quantity: order.quantity - deliveredAmount }
          : order
      );

      // Add partial delivery to deliveries array
      const updatedTable = await Orders.findOneAndUpdate(
        { table: selectedTable },
        {
          orders: updatedOrders, // Update the orders array with reduced quantity
          $push: { deliveries: { ...orderToMove, quantity: deliveredAmount } }, // Add partial delivery to deliveries array
        },
        { new: true }
      );

      if (!updatedTable)
        return res.status(500).json({ message: "Failed to update table" });

      console.log("Updated Table after Partial Delivery:", updatedTable);
      return res.status(200).json({
        message: "Partial delivery completed successfully",
        updatedTable,
      });
    } else {
      return res.status(400).json({
        message: "Delivered amount cannot exceed order quantity for partial delivery",
      });
    }
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

router
  .route("/:table")
  .get(async (req, res) => {
    try {
      const { table } = req.params;
      const item = await Orders.findOne({ table: table });
      if (!item) {
        return res.status(404).json({ message: "Table not found" });
      }
      res.json(item);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .patch(async (req, res) => {
    try {
      const { table } = req.params;

      const updatedTable = await Orders.findOneAndUpdate(
        { table: table },
        { $set: req.body },
        { new: true }
      );

      if (!updatedTable) {
        return res.status(404).json({ message: "Table not found" });
      }

      res.json(updatedTable);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const { table } = req.params;
      const deleteId = await Item.findOneAndDelete({ table: table });

      if (!deleteId) {
        return res.status(404).json({ message: "Item not found" });
      }

      res.json({ message: "Deleted Item:", deleteId });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
