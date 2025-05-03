const express = require("express");
require('dotenv').config();
//const { connect } = require("mongoose");
const app = express();

const connectDb = require('./config/database');

connectDb();

// const mongourl = process.env.MONGO_URL;
// console.log(mongourl);
app.get('/', (req,res) =>{
    res.send("Hello word");
});
app.use(express.json());
app.use('/api/products', require('./routes/product_route'));
app.use('/api/categories', require('./routes/category_route'));
app.use('/api/brands', require('./routes/brand_route'));
app.use('/api/users', require('./routes/user_route'));
app.use('/api/carts', require('./routes/cart_route'));

const PORT = 3000;

app.listen(PORT, () =>{
    console.log("sever is running on pport " + PORT);
})