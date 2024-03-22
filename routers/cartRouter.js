const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cartController");
const CartItemController = require("../controllers/cartItemController");

// POST /carts - Create a new cart
router.post("/", CartController.createCart);

// GET /carts - Get all carts
router.get("/", CartController.getAllCarts);

// GET /carts/:id - Get cart by ID
router.get("/:id", CartController.getCartById);

// PUT /carts/:id - Update cart
router.put("/:id", CartController.updateCart);

// POST /carts/:cartId/items - Add item to cart
router.post("/:cartId/items", CartItemController.addCartItem);
router.put("/:cartItemId/items", CartItemController.updateCartItem);
router.delete("/:cartItemId/items", CartItemController.deleteCartItem);

module.exports = router;
