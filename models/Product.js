const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Product = mongoose.model(
  'Product',
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
      },
      description: {
        type: String,
      },
      price: {
        type: Number,
        required: true,
      },
      colors: {
        type: Array,
        required: true,
      },
      codeColors: {
        type: Array,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      images: {
        type: Array,
        required: true,
      },
      stock: {
        type: Object,
      },
    },
    { timestamps: true },
  ),
);

module.exports = Product;
