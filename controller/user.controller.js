const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Use environment variable or fallback to a development secret
const jwt_secret = process.env.JWT_SECRET || 'your-development-secret-key';
const jwt_expires_in = process.env.JWT_EXPIRES_IN || '30d';

const generateToken = (userId) => {
    if (!jwt_secret) {
        throw new Error('JWT_SECRET is not configured');
    }
    return jwt.sign({id: userId}, jwt_secret, {expiresIn: jwt_expires_in});
}

exports.register = async(req, res) => {
    try{
        const {email, password} = req.body;

        // Check if user already exists 
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already registered with this email."});
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        req.body.password = hashPassword;

        // Create and save new user
        const newUser = new User(req.body);
        await newUser.save();

        // Generate token
        const token = generateToken(newUser._id);

        res.status(201).json({
            message: "User registered successfully",
            user: newUser,
            token: token
        });

    }catch(error){
        console.error("Registration error:", error);
        res.status(500).json({message: error.message});
    }
};

exports.login = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid password"});
        }
        
        // Generate token for login
        const token = generateToken(user._id);
        
        res.status(200).json({
            message: "Login successful",
            user: user,
            token: token
        });
        
    }catch(error){
        console.error("Login error:", error);
        res.status(500).json({message: error.message}); 
    }
}
