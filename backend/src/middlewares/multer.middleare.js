const multer = require('multer')

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')){
        cb(null, true);
    }else{
        cb(new Error('only image and video file are allowed'), false)
    }
}

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 15 * 1024 * 1024 } // Limit: 15MB per image
});

module.exports = upload;