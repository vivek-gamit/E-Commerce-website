const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
async function registerUser(req, res){

    try {
        const { name, email, password, phone, role } = req.body;

        const userExists = await User.findOne({ $or: [{ email }, { phone }] });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, phone, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ success: true, message: "User created!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// LOGIN
async function loginUser(req, res){
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token)

        res.status(200).json({ 
            success: true, 
            token, 
            user: { id: user._id, name: user.name, role: user.role } 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET PROFILE (Protected logic)
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // From auth middleware
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
 
async function logoutUser(req,res){
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0), // Sets expiration to 1970 (immediate delete)
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none'
        });
        
        res.status(200).json({ success: true, message: "Logged Out Successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { registerUser, loginUser, getUserProfile, logoutUser}
