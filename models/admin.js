const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Amdin = mongoose.model(
  'Admin',
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
    },
    { timestamps: true },
  ),
);

module.exports = Admin;
