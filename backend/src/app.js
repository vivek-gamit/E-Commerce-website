const express = require("express")
const authRoutes = require('../src/routes/auth.routes')
const productRoutes = require('../src/routes/product.routes')
const adminRoutes = require('../src/routes/admin.routes')
const orderRoutes = require('../src/routes/order.routes')
const carRoutes = require('../src/routes/cart.routes')
require("dotenv").config();
const cookieParser = require("cookie-parser")
const cors = require('cors');
require('../src/models/product.model')

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:4000', ] ,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token']
}));

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/cart', carRoutes)


module.exports = app;