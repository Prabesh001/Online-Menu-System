require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const app = express();
const PORT = 5000;

const employeeRoutes = require("./routes/employeeRoutes")
const menuRoutes = require("./routes/menuRoutes")
const orderRoutes = require("./routes/orderRoutes")
const homeMenuRoute = require("./routes/homeMenuRoute")

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Failed to connect to MongoDB Atlas:", err));

app.use("/api/employee",employeeRoutes)
app.use("/api/menu",menuRoutes)
app.use("/api/homeMenu",homeMenuRoute)
app.use("/api/table",orderRoutes)

// app.get("/api/employee", async (req, res) => {
//   try {
//     const employees = await Team.find();
//     res.json(employees);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch employees." });
//   }
// });

// app.post("/api/employee", async (req, res) => {
//   try {
//     const { password, ...otherDetails } = req.body;
//     if (!password || !otherDetails.first_name || !otherDetails.last_name) {
//       return res.status(400).json({ error: "Missing required fields." });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newEmployee = new Team({
//       ...otherDetails,
//       hashedPassword,
//     });

//     await newEmployee.save();
//     res.status(201).json({ message: "User created successfully!" });
//   } catch (err) {
//     res.status(500).json({ error: "Error creating user." });
//   }
// });


// app.post("/api/employee/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await Team.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ error: "Invalid email or password." });
//     }

//     const isPasswordValid = bcrypt.compare(password, user.hashedPassword);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: "Invalid email or password." });
//     }

//     const { hashedPassword, ...userInfo } = user.toObject();
//     const token = jwt.sign( userInfo, SECRET_KEY, { expiresIn: "24h" });

//     res.json({ token, user });
//   } catch (error) {
//     res.status(500).json({ error: "Login failed." });
//   }
// });



// app.get("/api/employee/:id", async (req, res) => {
//   try {
//     const employee = await Team.findById(req.params.id);
//     if (!employee) {
//       return res.status(404).json({ error: "Employee not found." });
//     }
//     res.json(employee);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch employee." });
//   }
// });


// app.patch("/api/employee/:id", async (req, res) => {
//   try {
//     const { password, ...updateFields } = req.body;
//     if (password) {
//       updateFields.hashedPassword = await bcrypt.hash(password, 10);
//     }

//     const updatedEmployee = await Team.findByIdAndUpdate(
//       req.params.id,
//       updateFields,
//       { new: true }
//     );

//     if (!updatedEmployee) {
//       return res.status(404).json({ error: "Employee not found." });
//     }

//     res.json(updatedEmployee);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update employee." });
//   }
// });


// app.delete("/api/employee/:id", async (req, res) => {
//   try {
//     const deletedEmployee = await Team.findByIdAndDelete(req.params.id);
//     if (!deletedEmployee) {
//       return res.status(404).json({ error: "Employee not found." });
//     }
//     res.json({ message: "Employee deleted successfully." });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete employee." });
//   }
// });

// // Get Items for Home menu
// app.get("/api/homeMenu", async (req, res) => {
//   try {
//     const items = await Home.find();
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Get Table condition
// app.get("/api/table", async (req, res) => {
//   try {
//     const table = await Orders.find();
//     res.json(table);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// //get, patch and delete table
// app
//   .route("/api/table/:table")
//   .get(async (req, res) => {
//     try {
//       const { table } = req.params;
//       const item = await Orders.findOne({ table: table });
//       if (!item) {
//         return res.status(404).json({ message: "Table not found" });
//       }
//       res.json(item);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   })
//   .patch(async (req, res) => {
//     //Edit data
//     try {
//       const { table } = req.params;

//       const updatedTable = await Orders.findOneAndUpdate(
//         { table: table },
//         { $set: req.body },
//         { new: true }
//       );

//       if (!updatedTable) {
//         return res.status(404).json({ message: "Table not found" });
//       }

//       res.json(updatedTable);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   })
//   .delete(async (req, res) => {
//     try {
//       const { table } = req.params;
//       const deleteId = await Item.findOneAndDelete({ table: table });

//       if (!deleteId) {
//         return res.status(404).json({ message: "Item not found" });
//       }

//       res.json({ message: "Deleted Item:", deleteId });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

// Get menu items
// app.get("/api/menu", async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
// //get, patch and delete menu
// app
//   .route("/api/menu/:id")
//   .get(async (req, res) => {
//     try {
//       const _id = req.params.id;
//       const item = await Item.findOne({ _id });
//       if (!item) {
//         return res.status(404).json({ message: "Item not found" });
//       }
//       res.json(item);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   })
//   .patch(async (req, res) => {
//     try {
//       const _id = req.params.id;
//       const updatedItem = await Item.findOneAndUpdate(
//         { _id },
//         { $set: req.body },
//         { new: true }
//       );

//       if (!updatedItem) {
//         return res.status(404).json({ message: "Item not found" });
//       }

//       res.json(updatedItem);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   })
//   .delete(async (req, res) => {
//     try {
//       const _id = req.params.id;
//       const deleteId = await Item.findOneAndDelete({ _id });

//       if (!deleteId) {
//         return res.status(404).json({ message: "Item not found" });
//       }

//       res.json({ message: "Deleted Item:", deleteId });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

// //insert new menu items
// app.post("/api/menu", async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       category,
//       availability,
//       photoUrl,
//       discountedPrice,
//       foodPreferences,
//     } = req.body;

//     if (!name || !description || !price || !category || !photoUrl) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const newItem = new Item({
//       _id: new mongoose.Types.ObjectId().toString(),
//       name,
//       description,
//       price,
//       category,
//       photoUrl,
//       availability,
//       discountedPrice: price,
//       foodPreferences,
//     });

//     await newItem.save();
//     res.status(201).json({ message: "Item added successfully", newItem });
//   } catch (err) {
//     console.error("Error in adding item:", err);
//     res.status(500).json({ message: err.message, error: err });
//   }
// });

// Server setup

const server = http.createServer(app);
server.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
