const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Team } = require("../schemas");

const SECRET_KEY = process.env.JWT_SECRET;

router.get("/", async (req, res) => {
  try {
    const employees = await Team.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employees." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { password, ...otherDetails } = req.body;
    if (!password || !otherDetails.first_name || !otherDetails.last_name) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Team({
      ...otherDetails,
      hashedPassword,
    });

    await newEmployee.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Error creating user." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Team.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const isPasswordValid = bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const { hashedPassword, ...userInfo } = user.toObject();
    const token = jwt.sign( userInfo, SECRET_KEY, { expiresIn: "24h" });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Login failed." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const employee = await Team.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employee." });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { password, ...updateFields } = req.body;
    if (password) {
      updateFields.hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedEmployee = await Team.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: "Failed to update employee." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployee = await Team.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found." });
    }
    res.json({ message: "Employee deleted successfully.", deletedEmployee });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete employee." });
  }
});

module.exports = router;
