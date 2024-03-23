const Order = require("../models/Order");

const OrderController = {
  createOrder: async (req, res) => {
    try {
      const {
        userId,
        total_amount,
        payment_status,
        status,
        shipping_address,
        billing_address,
      } = req.body;

      const newOrder = new Order({
        userId,
        total_amount,
        payment_status,
        status,
        shipping_address,
        billing_address,
      });

      await newOrder.save();

      res
        .status(201)
        .json({ message: "Order created successfully.", order: newOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found." });
      }
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const {
        total_amount,
        payment_status,
        status,
        shipping_address,
        billing_address,
      } = req.body;
      const orderId = req.params.id;

      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {
          total_amount,
          payment_status,
          status,
          shipping_address,
          billing_address,
        },
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found." });
      }

      res
        .status(200)
        .json({ message: "Order updated successfully.", order: updatedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const orderId = req.params.id;
      const deletedOrder = await Order.findByIdAndDelete(orderId);

      if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found." });
      }

      res
        .status(200)
        .json({ message: "Order deleted successfully.", order: deletedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },
};

module.exports = OrderController;
