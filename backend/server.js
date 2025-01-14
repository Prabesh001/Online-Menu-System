const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const app = express();
const PORT = 5000;

// CORS options to allow multiple origins
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
    if (allowedOrigins.includes(origin) || !origin) {
      // Allow requests with no origin (e.g., Postman, mobile apps)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Use the CORS options
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://shresthaniraj43:BMC%40123@tablemate.l4zz8.mongodb.net/Tablemate?retryWrites=true&w=majority&appName=TableMate')
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Failed to connect to MongoDB Atlas:', err));

// Define a schema with more fields
const itemSchema = new mongoose.Schema({
    _id: String,
    name: String,
    description: String,
    price: Number,
    category: String,
    availability: Boolean,
    image_url: String,
    promotion: Boolean,
}, { collection: "menuItem" });

// Create a model from the schema
const Item = mongoose.model('menuItem', itemSchema);

// Endpoint to get all items
app.get('/api/menu', async (req, res) => {
    try {
        const items = await Item.find(); // Fetch all items
        res.json(items); // Return the items array
        console.log(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create the HTTP server instance and set custom timeout values
const server = http.createServer(app);

// Adjust timeouts
server.keepAliveTimeout = 120000; // 120 seconds for keep-alive connections
server.headersTimeout = 120000;   // 120 seconds for headers to be received

// Start the server
server.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://localhost:${PORT}`));
