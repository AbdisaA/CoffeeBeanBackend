const Cart = require("../models/Cart");

const CartController = {
  createCart: async (req, res) => {
    try {
      const { userId, total, status } = req.body;
      const newCart = new Cart({ userId, total, status });
      await newCart.save();
      // Populate the userId field
      const populatedCart = await newCart.populate("userId").execPopulate();
      res
        .status(201)
        .json({ message: "Cart created successfully.", cart: populatedCart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  getAllCarts: async (req, res) => {
    try {
      const carts = await Cart.find().populate("userId");
      res.status(200).json(carts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  updateCart: async (req, res) => {
    try {
      const { total, status } = req.body;
      const cartId = req.params.id;
      const updatedCart = await Cart.findByIdAndUpdate(
        cartId,
        { total, status },
        { new: true }
      ).populate("userId");

      if (!updatedCart) {
        return res.status(404).json({ message: "Cart not found." });
      }

      res
        .status(200)
        .json({ message: "Cart updated successfully.", cart: updatedCart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  // You can add other methods like deleteCart, etc.
};

module.exports = CartController;
