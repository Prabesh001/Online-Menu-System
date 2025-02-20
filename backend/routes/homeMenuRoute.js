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
    const items = await History.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/transaction", async (req, res) => {
  try {
    const data = req.body;

    if (!data) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newItem = new History(data);

    await newItem.save();
    res.status(201).json({ message: "Item added successfully", newItem });
  } catch (err) {
    console.error("Error in adding item:", err);
    res.status(500).json({ message: err.message, error: err });
  }
});

module.exports = router;