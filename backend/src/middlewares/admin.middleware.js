const jwt = require('jsonwebtoken')

async function adminMiddleware(req, res, next) {
    const { token } = req.headers;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = decoded
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized User" })

    }
}

module.exports = { adminMiddleware };