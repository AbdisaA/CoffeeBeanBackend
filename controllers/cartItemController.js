const CartItem = require("../models/CartItem");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const CartItemController = {
  addCartItem: async (req, res) => {
    try {
      const { cartId, productId, quantity, price } = req.body;

      const cart = await Cart.findById(cartId);
      const product = await Product.findById(productId);

      if (!cart) {
        return res.status(404).json({ message: "Cart not found." });
      }

      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }

      const newCartItem = new CartItem({ cartId, productId, quantity, price });
      await newCartItem.save();

      res.status(201).json({
        message: "Cart item added successfully.",
        cartItem: newCartItem,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  updateCartItem: async (req, res) => {
    try {
      const { cartItemId } = req.params;
      const { quantity, price } = req.body;

      const updatedCartItem = await CartItem.findByIdAndUpdate(
        cartItemId,
        { quantity, price },
        { new: true }
      );

      if (!updatedCartItem) {
        return res.status(404).json({ message: "Cart item not found." });
      }

      res.status(200).json({
        message: "Cart item updated successfully.",
        cartItem: updatedCartItem,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  deleteCartItem: async (req, res) => {
    try {
      const { cartItemId } = req.params;

      const deletedCartItem = await CartItem.findByIdAndDelete(cartItemId);

      if (!deletedCartItem) {
        return res.status(404).json({ message: "Cart item not found." });
      }

      res.status(200).json({ message: "Cart item deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },
};

module.exports = CartItemController;
