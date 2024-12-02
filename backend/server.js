const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors({ origin: 'http://localhost:5173' })); // Allow requests from React app
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://shresthaniraj43:BMC%40123@tablemate.l4zz8.mongodb.net/Tablemate?retryWrites=true&w=majority&appName=TableMate')
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.log(err));

// Define a schema with more fields
const itemSchema = new mongoose.Schema({
    item_id: String,
    name: String,
    description: String,
    price: Number,
    category: String,
    availability: Boolean,
    image_url: String,
    promotion: Boolean,
},
{ collection: "menuItem" });

// Create a model from the schema
const Item = mongoose.model('menuItem', itemSchema);

// Endpoint to get all items
app.get('/api/menu', async (req, res) => {
    try {
        const items = await Item.find(); // Fetch all items
        res.json(items); // Return the items array
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
