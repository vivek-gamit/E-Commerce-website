const cartModel = require('../models/cart.model');
const productModel = require('../models/product.model')

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id; // From your auth middleware

        // 1. Get Product details to get the image and price
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        let cart = await cartModel.findOne({ userId });

        if (!cart) {
            // Create new cart if it doesn't exist
            cart = new cartModel({
                userId,
                items: [{
                    productId,
                    name: product.name,
                    price: product.price,
                    image: product.images[0], // Use the first image from ImageKit array
                    quantity
                }]
            });
        } else {
            // Check if product already exists in cart
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({
                    productId,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    quantity
                });
            }
        }

        await cart.save();
        res.status(200).json({ success: true, message: "Added to cart", cart });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getCart = async (req, res) => {
    try {
        const userId = req.user.id; // Ensure your authMiddleware is working

        // 1. Find the cart
        const cart = await cartModel.findOne({ userId });

        // 2. If no cart exists yet, don't crash! Send an empty array back.
        if (!cart) {
            return res.status(200).json({ 
                success: true, 
                cart: { items: [] } 
            });
        }

        // 3. Success
        res.status(200).json({ success: true, cart });

    } catch (error) {
        console.error("CART GET ERROR:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        const cart = await cartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        const initialLength = cart.items.length;
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        if (cart.items.length === initialLength) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        await cart.save();
        res.status(200).json({ success: true, message: "Item removed from cart" });

    } catch (error) {
        console.error("Remove Item Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id; // From your auth middleware

        // 1. Find the cart using your correct model name (cartModel)
        const cart = await cartModel.findOne({ userId });
        
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        // 2. Find the item index
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            // Update the quantity
            cart.items[itemIndex].quantity = Math.max(1, quantity);
            await cart.save();

            // 3. Return a response format the frontend expects
            return res.status(200).json({ 
                success: true, 
                message: "Quantity updated", 
                cart 
            });
        } else {
            return res.status(404).json({ success: false, message: "Product not found in cart" });
        }

    } catch (err) {
        console.error("Update Qty Error:", err.message);
        res.status(500).json({ 
            success: false, 
            message: "Error updating quantity", 
            error: err.message 
        });
    }
};
module.exports = { addToCart, getCart, removeFromCart, updateQuantity };


