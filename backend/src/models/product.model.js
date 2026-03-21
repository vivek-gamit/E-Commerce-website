const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: Array, required: true }, // Store multiple ImageKit/Cloudinary URLs
    category: { type: String, required: true }, // e.g., "Topwear", "Bottomwear"
    subCategory: { type: String, required: true }, // e.g., "T-shirt", "Jeans"
    sizes: { type: Array, required: true }, // e.g., ["S", "M", "L"]
    bestSeller: { type: Boolean, default: false },
    date: { type: Number, required: true } // Timestamp for "New Arrivals" sorting
}, { timestamps: true });

const productModel = mongoose.model("product", productSchema);

module.exports =productModel;