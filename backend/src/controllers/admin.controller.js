const jwt = require('jsonwebtoken');

async function loginAdmin(req, res) {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign({ role: 'admin', email: email }, process.env.JWT_SECRET);

            res.cookie('token', token);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid admin credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

module.exports = { loginAdmin }

