const { default: mongoose } = require("mongoose");

const CartItemSchema = new mongoose.Schema(
  {
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number },
    price: { type: Number },
  },
  {
    timestamps: true,
  }
);
const CartItem = mongoose.model("CartItem", CartItemSchema);

module.exports = CartItem;
