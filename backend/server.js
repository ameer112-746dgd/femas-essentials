const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 1. CRITICAL: Load .env BEFORE anything else
dotenv.config(); 

const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Connect to MongoDB
connectDB();

const app = express();

// 2. CONSOLIDATED CORS CONFIGURATION
// This includes your custom domain, render URL, and local dev environments
const allowedOrigins = [
  'https://femas-frontend.onrender.com',
  'https://www.femasessentials.com',
  'https://femasessentials.com',
  'http://localhost:5173', // Vite default
  'http://localhost:3000'  // CRA default
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// 3. Middleware
app.use(express.json()); // Allows parsing JSON data

// 4. API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);

// 5. Port Config
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS enabled for: ${allowedOrigins.join(', ')}`);
});