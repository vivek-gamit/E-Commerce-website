const orderModel = require('../models/order.model.js');
const userModel = require('../models/user.model.js');
const cartModel = require('../models/cart.model.js');

// Placing order using Cash On Delivery
const placeOrder = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.user.id;

        const orderData = {
            userId,
            items,
            address, 
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // --- FIXED LOGIC START ---
        
        // Ensure user.address is an array (sometimes Mongoose defaults can be tricky)
        if (!Array.isArray(user.address)) {
            user.address = [];
        }

        // Check if this street already exists in the saved list
        // We use address.street because that comes from the frontend req.body
        const isDuplicate = user.address.find(item => item.street === address.street);

        if (!isDuplicate) {
            // Add the new address to the top of the array
            user.address.unshift(address);
            
            // Keep only the last 5 addresses
            if (user.address.length > 5) {
                user.address = user.address.slice(0, 5);
            }
        }

        // --- FIXED LOGIC END ---

        // Mark the field as modified so Mongoose knows to save the array changes
        user.markModified('address'); 
        await user.save();

        await cartModel.findOneAndDelete({ userId });

        res.json({ success: true, message: "Order Placed Successfully" });

    } catch (error) {
        console.log("Order Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Get orders for a specific user
const userOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}



module.exports = { placeOrder, userOrders }