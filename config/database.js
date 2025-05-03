const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_URL;

const connectDB = async() =>{
    try{
        await mongoose.connect(mongo_url,{}).then(()=> console.log("MongoDB connected successfully"));
    } catch(error){
        console.log("MongoDB connection error");
    }
}

module.exports = connectDB;