const express = require("express");
const router = express.Router();
const { Orders } = require("../schemas");

router.get("/", async (req, res) => {
  try {
    const table = await Orders.find();
    res.json(table);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
