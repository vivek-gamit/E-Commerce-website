const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true }
    }],
    amount: { type: Number, required: true },
    address: { type: Object, required: true }, // Will store street, city, state, zip, etc.
    status: { type: String, default: 'Order Placed' }, // Order Placed, Shipped, Out for delivery, Delivered
    paymentMethod: { type: String, required: true }, // COD, Stripe, Razorpay
    payment: { type: Boolean, default: false }, // Paid or Not Paid
    date: { type: Number, default: Date.now }
}, { timestamps: true });

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
module.exports = orderModel;