const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        name: String,
        price: Number,
        image: String, // We will store product.images[0] here
        quantity: { type: Number, default: 1 }
    }]
}, { timestamps: true });

const cartModel = mongoose.model('Cart', cartSchema);

module.exports = cartModel;