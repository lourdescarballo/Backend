// src/models/cart.model.js

import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: [1, 'La cantidad mínima es 1'],
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
