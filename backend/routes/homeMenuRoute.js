const express = require("express");
const router = express.Router();
const { Home, History } = require("../schemas");

router.get("/", async (req, res) => {
  try {
    const items = await Home.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/transaction", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 7; 
    const items = await History.find().limit(limit);
    items.sort((a, b) => b.count - a.count);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/transaction", async (req, res) => {
  try {
    const { _id, quantity, ...rest } = req.body;

    if (!_id || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingData = await History.findOne({_id: _id});

    if (existingData) {
      existingData.count = Number(existingData.count || 0) + Number(quantity);
      await History.updateOne({}, { $unset: { quantity: 1 } });
      await existingData.save();
      return res
        .status(201)
        .json({ message: "Item updated successfully", existingData });
    }

    const newItem = new History({ _id, count: Number(quantity), ...rest });
    await newItem.updateOne(newItem._id, { $unset: { quantity: 1 } });
    await newItem.save();
    res.status(201).json({ message: "Item added successfully", newItem });
  } catch (err) {
    console.error("Error in adding item:", err);
    res.status(500).json({ message: err.message, error: err });
  }
});

module.exports = router;
