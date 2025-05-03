const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  
  {
    name: {
      type: String,
      require: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      default: null,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      require: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      require: true,
    },
    sku: {
      type: String,
      require: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
