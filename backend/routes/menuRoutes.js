const express = require("express");
const router = express.Router();
const { Item } = require("../schemas");

router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      availability,
      photo,
      discountedPrice,
      foodPreferences,
    } = req.body;

    if (!name || !description || !price || !category || !photo) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newItem = new Item({
      name,
      description,
      price,
      category,
      photo,
      availability,
      discountedPrice: price,
      foodPreferences,
    });

    await newItem.save();
    res.status(201).json({ message: "Item added successfully", newItem });
  } catch (err) {
    console.error("Error in adding item:", err);
    res.status(500).json({ message: err.message, error: err });
  }
});

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const _id = req.params.id;
      const item = await Item.findOne({ _id });
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(item);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .patch(async (req, res) => {
    try {
      const _id = req.params.id;
      const updatedItem = await Item.findOneAndUpdate(
        { _id },
        { $set: req.body },
        { new: true }
      );

      if (!updatedItem) {
        return res.status(404).json({ message: "Item not found" });
      }

      res.json(updatedItem);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const _id = req.params.id;
      const deleteId = await Item.findOneAndDelete({ _id });

      if (!deleteId) {
        return res.status(404).json({ message: "Item not found" });
      }

      res.json({ message: "Deleted Item:", deleteId });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
