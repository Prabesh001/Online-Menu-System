require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const app = express();
const PORT = 5000;
const {Users} = require("./schemas")

const employeeRoutes = require("./routes/employeeRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const homeMenuRoute = require("./routes/homeMenuRoute");

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
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Failed to connect to MongoDB Atlas:", err));

app.use("/api/employee", employeeRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/homeMenu", homeMenuRoute);
app.use("/api/table", orderRoutes);


 app.post("/api/user", async (req, res) => {
    try {
      const data = req.body;
      if (!data) {
        return res.status(400).json({ error: "Missing required fields." });
      }
  
      const newUser = new Users(data);
  
      await newUser.save();
      res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
      res.status(500).json({ error: "Error creating user." });
    }
  });
const server = http.createServer(app);
server.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
