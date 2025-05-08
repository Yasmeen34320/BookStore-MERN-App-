const express = require('express');

const app = express();
const cors = require('cors');
// .ENV 
require('dotenv').config();
require('./conn/conn.js');

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
///Routes
const userRoute = require('./routes/user.js');
const bookRoute = require('./routes/book.js');
const favRoute= require('./routes/favourite.js');
const cartRoute= require('./routes/cart.js');
const orderRoute= require('./routes/order.js');
app.use('/api/user', userRoute);
app.use('/api/book', bookRoute);
app.use('/api/favourite', favRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);
// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});