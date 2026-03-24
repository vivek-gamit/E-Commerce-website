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
    const userId = req.user.id;
   
    
    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
       
        if (!cart) {
            return res.status(200).json({ items: [] });
        }

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: "Error fetching cart", error: err.message });
    }
};

const removeFromCart = async (req, res) => {
    const { id } = req.params; // The productId to remove
    const userId = req.user.id;

    try {
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { items: { productId: id } } },
            { new: true } // Returns the updated cart after removal
        ).populate('items.productId');

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: "Error removing item", error: err.message });
    }
};

const updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body; 
  const userId = req.user.id;

  try {
    
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

   
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
    
      cart.items[itemIndex].quantity = Math.max(1, quantity);
      await cart.save();

      const updatedCart = await Cart.findOne({ userId }).populate('items.productId');
      res.status(200).json(updatedCart);
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating quantity", error: err.message });
  }
};

module.exports = { addToCart, getCart, removeFromCart, updateQuantity };


