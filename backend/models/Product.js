const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  // Changed this to store binary data inside MongoDB
  image: {
    data: Buffer,
    contentType: String
  },
  ingredients: { type: String },
  usage: { type: String }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;