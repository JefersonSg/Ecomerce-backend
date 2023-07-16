const mongoose = require('mongoose');
const { Schema } = mongoose;

const Category = mongoose.model(
  'category',
  new Schema({
    Category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  }),
);

module.exports = Category;
