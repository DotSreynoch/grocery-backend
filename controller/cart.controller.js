const Cart = require("../models/cart");


exports.createCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Find existing cart
        let existingCart = await Cart.findOne({ userId });

        if (!existingCart) {
            // Create new cart if it doesn't exist
            const cart = new Cart({
                userId: userId,
                items: [{
                    productId: productId,
                    quantity: quantity
                }]
            });
            await cart.save();
            return res.status(201).json({
                message: "Cart created successfully",
                cart: cart
            });
        }

        // Update existing cart
        const Index = existingCart.items.findIndex(
            item => item.productId.toString() === productId.toString()
        );

        if (Index !== -1) {
            existingCart.items[Index].quantity += quantity;
        } else {
            existingCart.items.push({
                productId: productId,
                quantity: quantity
            });
        }

        await existingCart.save();
        res.status(200).json({
            message: "Cart updated successfully",
            cart: existingCart
        });
    } catch (error) {
        console.error("Cart operation error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.removeCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedCart = await Cart.findOneAndDelete({ userId: userId });

        if (!deletedCart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        res.status(200).json({
            message: "Cart removed successfully",
            cart: deletedCart
        });

    } catch (error) {
        console.error("Cart removal error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.removeCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        
        // Find the cart
        const cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Remove the item from cart
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        // If cart is empty, delete it
        if (cart.items.length === 0) {
            await Cart.findOneAndDelete({ userId: userId });
            return res.status(200).json({ message: "Cart is empty and has been deleted" });
        }

        // Save the updated cart
        await cart.save();
        res.status(200).json({
            message: "Cart item removed successfully",
            cart: cart
        });

    } catch (error) {
        console.error("Remove cart item error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.getCart = async (req, res)=>{
    try{
        const {userId} = req.params;
        const cart = await Cart.findOne({userId: userId});
        // if(!cart){
        //     return res.status(404).json({message: "Cart not found"});
        // }
        res.status(200).json({message: "Cart fetched successfully", cart: cart});


    }catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.updateCartItemQuantity = async (req, res)=>{
    try{

        const {userId, productId} = req.params;
        const {quantity} = req.body;

        const cart = await Cart.findOne({userId});
        if(!cart){
            return res.status(404).json({message: "Cart not found"});
        }
        const existingCartItem = cart.items.find(item => item.productId.toString() === productId.toString());
        if(!existingCartItem){
            return res.status(404).json({message: "product not found in cart"});
        }

        existingCartItem.quantity += quantity;
        await cart.save();
        res.status(200).json({message: "Cart item quantity updated successfully", cart: cart});

    }catch(error){
        res.status(500).json({message: error.message});

    }
};
