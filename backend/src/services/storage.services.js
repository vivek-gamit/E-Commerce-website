const ImageKit = require("imagekit"); 
require("dotenv").config();

const imagekit = new ImageKit({
    publicKey: "public_hoRgSU+AK+mtsTnIiIW7oCN/Q7I=", 
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: "https://ik.imagekit.io/opdlhflsvu"
    
});

const uploadToImagekit = async(fileBuffer, fileName) => {

    try {
        
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: fileName,
            folder: "/fashion-store/product"
        })

        return response;
    } catch (error) {
        throw new Error("ImageKit Upload Failed: " + error.message);
    }

}

module.exports = { uploadToImagekit };