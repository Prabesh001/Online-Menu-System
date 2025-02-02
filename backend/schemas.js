const mongoose = require("mongoose");

// Item Schema
const itemSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    description: String,
    price: Number,
    discountedPrice: Number,
    category: String,
    availability: Boolean,
    photoUrl: String,
    promotion: Boolean,
    foodPreferences: { type: String, enum: ["Veg", "Non-veg"] },
  },
  { collection: "menuItem", versionKey: false }
);
const Item = mongoose.model("menuItem", itemSchema);

// Home Schema
const homeItemSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    description: String,
    price: Number,
    discountedPrice: Number,
    category: Array,
    availability: Boolean,
    photo: String,
  },
  { collection: "specialMenu", versionKey: false }
);
const Home = mongoose.model("specialMenu", homeItemSchema);

// Team Schema
const teamSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    Username: String,
    email: String,
    hashedPassword: String,
    age: Number,
    phone_number: String,
    photo: String,
    access_level: { type: String, enum: ["admin", "manager", "employee"] },
  },
  { collection: "team", versionKey: false }
);
const Team = mongoose.model("team", teamSchema);

// Order Schema
const orderSchema = new mongoose.Schema(
  {
    _id: String,
    id: Number,
    table: Number,
    available: Boolean,
    orders: Array,
  },
  { collection: "TableOrders", versionKey: false }
);
const Orders = mongoose.model("TableOrders", orderSchema);

module.exports = {
  Item,
  Orders,
  Home,
  Team,
};
