const express = require("express")
const authRoutes = require('../src/routes/auth.routes')
const productRoutes = require('../src/routes/product.routes')
const adminRoutes = require('../src/routes/admin.routes')
require("dotenv").config();
const cookieParser = require("cookie-parser")
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token']
}));

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
app.use('/api/admin',adminRoutes)


module.exports = app;