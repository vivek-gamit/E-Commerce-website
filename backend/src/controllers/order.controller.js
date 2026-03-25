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
        }


        const newOrder = new orderModel(orderData);
        await newOrder.save();


        await cartModel.findOneAndDelete({ userId });

        res.json({ success: true, message: "Order Placed Successfully" });

    } catch (error) {
        console.log(error);
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