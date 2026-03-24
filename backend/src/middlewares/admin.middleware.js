const jwt = require('jsonwebtoken')

async function adminMiddleware(req, res, next) {
    const { token } = req.headers;


    if (!token) {
        return res.status(401).json({ message: "No Token Provided" });
    }
    // admin.middleware.js
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add this log to see EXACTLY what is inside your token
        console.log("Decoded Token Content:", decoded);

        if (decoded.role !== 'admin') {
            return res.status(401).json({ message: "Unauthorized: Access Denied" });
        }

        next();
    } catch (error) {
        console.log("JWT Error:", error.message);
        return res.status(401).json({ message: "Unauthorized User" });
    }
}

module.exports = { adminMiddleware };