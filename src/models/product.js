// src/models/product.model.js

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título es requerido'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'La descripción es requerida'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'El precio es requerido'],
      min: [0, 'El precio no puede ser negativo'],
    },
    code: {
      type: String,
      required: [true, 'El código es requerido'],
      unique: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, 'El stock es requerido'],
      min: [0, 'El stock no puede ser negativo'],
    },
    category: {
      type: String,
      required: [true, 'La categoría es requerida'],
      trim: true,
    },
    thumbnails: {
      type: [String],
      default: [],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Plugin para paginación
productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);

export default Product;


// import mongoose from 'mongoose';

// const productSchema = new mongoose.Schema({
//     title: String,
//     description: String,
//     price: Number,
//     code: String,
//     stock: Number,
//     status: { type: Boolean, default: true },
//     category: String
// });

// const Product = mongoose.model('Product', productSchema);

// module.exports = mongoose.model("Product", productSchema);
