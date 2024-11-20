const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cartDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// MongoDB Schema for Order
const orderSchema = new mongoose.Schema({
  items: [{
    id: Number,
    name: String,
    price: String,
    quantity: Number,
    img: String
  }],
  total: Number,
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// Route to save order
app.post('/api/orders', (req, res) => {
  const { cart, total } = req.body;

  const newOrder = new Order({
    items: cart,
    total: total
  });

  newOrder.save()
    .then(order => {
      res.status(200).json({ message: 'Order saved successfully', order });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error saving order', error: err });
    });
});

// Start server
app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
