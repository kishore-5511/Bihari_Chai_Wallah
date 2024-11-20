// models/Order.js
const mongoose = require('mongoose');

// Define the schema for the order
const orderSchema = new mongoose.Schema({
  items: [{
    name: String,
    price: String,
    quantity: { type: Number, default: 1 }
  }],
  totalAmount: Number,
  paymentMethod: String,
  paymentStatus: { type: String, default: 'pending' }
}, { timestamps: true });

// Create and export the model
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
