const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 1. CRITICAL: Load .env BEFORE importing routes or connecting DB
dotenv.config(); 

const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const contactRoutes = require('./routes/contactRoutes'); // <--- Import Contact Routes

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows parsing JSON data from frontend

app.use(cors({
  origin: ['https://femas-frontend.onrender.com', 'http://localhost:5173'], // Allow both live and local testing
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// API Routes
app.use('/api/products', productRoutes); // Handles fetching products
app.use('/api/orders', orderRoutes);     // Handles Checkout & Order Emails
app.use('/api/contact', contactRoutes);  // Handles Contact Form Emails

// Port Config (5001 for Mac compatibility)
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});