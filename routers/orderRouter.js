const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");

// POST /orders - Create a new order
router.post("/", OrderController.createOrder);

// GET /orders - Get all orders
router.get("/", OrderController.getAllOrders);

// GET /orders/:id - Get order by ID
router.get("/:id", OrderController.getOrderById);

// PUT /orders/:id - Update an order
router.put("/:id", OrderController.updateOrder);

// DELETE /orders/:id - Delete an order
router.delete("/:id", OrderController.deleteOrder);

module.exports = router;
