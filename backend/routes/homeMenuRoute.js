const express = require("express");
const router = express.Router();
const { Home } = require("../schemas");

router.get("/", async (req, res) => {
  try {
    const items = await Home.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;