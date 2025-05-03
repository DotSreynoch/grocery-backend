const express = require("express");
const router = express.Router();
const cartController = require("../controller/cart.controller");

router.post("/", cartController.createCart);
router.delete("/:userId", cartController.removeCart);
router.delete("/items/:userId/:productId", cartController.removeCartItem);
router.patch("/items/:userId/:productId", cartController.updateCartItemQuantity);
router.get("/", cartController.getCart);

module.exports = router;
