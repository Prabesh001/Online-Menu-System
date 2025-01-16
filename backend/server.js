const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const http = require("http");

const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS options
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://shresthaniraj43:BMC%40123@tablemate.l4zz8.mongodb.net/Tablemate?retryWrites=true&w=majority&appName=TableMate"
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Failed to connect to MongoDB Atlas:", err));

const itemSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    description: String,
    price: Number,
    category: String,
    availability: Boolean,
    image_url: String,
    promotion: Boolean,
  },
  { collection: "menuItem", versionKey: false }
);
// Team schema and model
const teamSchema = new mongoose.Schema(
  {
    _id: String,
    id: String,
    first_name: String,
    last_name: String,
    Username: String,
    email: String,
    password: String,
    hashedPassword: String,
    age: Number,
    phone_number: String,
    access_level: { type: String, enum: ["admin", "manager", "employee"] },
  },
  { collection: "team", versionKey: false }
);
const Item = mongoose.model("menuItem", itemSchema);
const Team = mongoose.model("team", teamSchema);

app.get("/api/menu", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app
  .route("/api/menu/:id")
  .get(async (req, res) => {
    try {
      const _id = req.params.id;
      const item = await Item.findOne({_id});
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

app.post("/api/menu", async (req, res) => {
  try {
    const { name, description, price, category, availability } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newItem = new Item({
      _id: new mongoose.Types.ObjectId().toString(),
      name,
      description,
      price,
      category,
      availability,
    });

    await newItem.save();
    res.status(201).json({ message: "Item added successfully", newItem });
  } catch (err) {
    console.error("Error in adding item:", err); // Log the error to the backend console
    res.status(500).json({ message: err.message, error: err });
  }
});

// Get all team members
app.get("/api/employee", async (req, res) => {
  try {
    const employees = await Team.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a team member by id
app
  .route("/api/employee/:id")
  .get(async (req, res) => {
    try {
      const id = req.params.id;
      const employee = await Team.find({ id });
      if (!employee) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(employee);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .patch(async (req, res) => {
    //Edit data
    try {
      const id = req.params.id;
      const updatedEmployee = await Team.findOneAndUpdate(
        { id },
        { $set: req.body },
        { new: true }
      );

      if (!updatedEmployee) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedEmployee);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .delete(async (req, res) => {
    //Delete data
    try {
      const id = req.params.id;
      const deleteId = await Team.findOneAndDelete({ id });

      if (!deleteId) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "Member removed:", deleteId });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Add a new team member
app.post("/api/employee", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      Username,
      email,
      password,
      age,
      phone_number,
      access_level,
    } = req.body;

    if (!first_name || !email || !password || !access_level) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new employee without manually setting `id`
    const newId = new mongoose.Types.ObjectId().toString();
    const newUser = new Team({
      _id: newId,
      id: newId,
      first_name,
      last_name,
      Username,
      email,
      password,
      hashedPassword: hashedPassword,
      age,
      phone_number,
      access_level,
    });

    await newUser.save();
    res.status(201).json({ message: "User added successfully", newUser });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: err.message });
  }
});

// Server setup
const server = http.createServer(app);
server.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
