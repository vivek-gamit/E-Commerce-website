const productModel = require('../models/product.model')
const { uploadToImagekit } = require('../services/storage.services')

async function addProduct(req, res) {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

        if(!req.files || req.files.length === 0){
            return res.status(400).json({success: false ,message: "upload at least one image"});
        }

        const imageUploadPromises = req.files.map(file => 
            uploadToImagekit(file.buffer, file.originalname)
        );

        const uploadResponse = await Promise.all(imageUploadPromises);

        const imageUrls = uploadResponse.map(response => response.url);

        const ProductData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            bestSeller: bestSeller === "true",
            sizes: JSON.parse(sizes), // "['S', 'M']" -> ['S', 'M']
            images: imageUrls,
            date: Date.now()
        }

        const newProduct = new productModel(ProductData);
        await newProduct.save();

        return res.status(201).json({ success: true ,message: "Product listed in the store"})

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message})
        
    }
} 

module.exports = { addProduct }