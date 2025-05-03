const express = require('express');
const Product = require("../models/product");
const router = express.Router();

router.get('/', async (req,res) =>{
    try{
        const products = await Product.find().populate("category", "name").populate("brand", "name");
        res.status(200).json(products);

    }catch(error){
        res.status(500).json({
            message: "Error: " + error.message
        });
    }
});

router.post('/', async (req,res) =>{
    try{
        const product = new Product(req.body);//get flie for json
        await product.save();
        res.status(201).json({message: "Product saved successfilly"});

    }catch(error){
        res.status(500).json({message: "SOmething went worng saving the product"});

    }
});

module.exports = router;