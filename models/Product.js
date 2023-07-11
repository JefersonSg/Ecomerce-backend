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
      model: {
        type: String,
      },
      price: {
        type: Number,
        required: true,
      },
      images: {
        type: Array,
        required: true,
      },
      image: {
        type: String,
      },
      stock: {
        type: Object,
      },
    },
    { timestamps: true },
  ),
);

module.exports = Product;
