const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    role: { type: String, enum: ['customer', 'admin', 'seller'], default: 'customer' },
    address: {
        type: Array,
        default: [] 
    },
    favorites: { type: Array, default: [] }
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;