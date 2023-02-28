    const userSchemas = require('../models/userSchema');

    const User = userSchemas;


    exports.postUser = async (req, res, next) => {
        console.log("hello");
        const {amount, username, password} = req.body;
        console.log(amount, username, password);
        // res.send("ok");
    if (!req.body.amount || !req.body.username || !req.body.password) {
            return res.status(400).json({success: false, error: 'Please provide a budget, username, and password'});
        }
        try { // Check if user with the same username already exists
            const user = await User.findOne({username});
            if (user) {
                return res.status(400).json({success: false, error: 'User with this username already exists'});
            }
            // Create new user
            let newUser = {
                username :req.body.username,
                password : req.body.password,
                amount : req.body.amount 
            }
            User.collection.insertOne(newUser);

            return res.status(201).json({success: true, data: newUser});
        } catch (err) {
            console.error(err);
            return res.status(500).json({success: false, error: 'Server error'});
        }
    };

    exports.getUsers = async (req, res, next) => {
        try {
            const users = await User.find();
            return res.status(200).json({success: true, count: users.length, data: users});
        } catch (err) {
            console.error(err);
            return res.status(500).json({success: false, error: "Server Error"});
        }
    };


    exports.getUserById = async (req, res, next) => {
        const id = req.params.id;

        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({success: false, error: "User not found"});
            }
            return res.status(200).json({success: true, data: user});
        } catch (err) {
            console.error(err);
            return res.status(500).json({success: false, error: "Server Error"});
        }
    };


    exports.updateUser = async (req, res, next) => {
        const id = req.params.id;
        const upamount = req.body.amount;

        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({success: false, error: "User not found"});
            }
            await user.updateOne({amount : upamount})
            let newUser = {
                _id : user.id,
                username : user.username,
                password : user.password,
                amount : upamount,

            }
            return res.status(200).json({success: true, data: newUser});
        } catch (err) {
            console.error(err);
            if (err.name === "ValidationError") {
                const messages = Object.values(err.errors).map((val) => val.message);
                return res.status(400).json({success: false, error: messages});
            } else {
                return res.status(500).json({success: false, error: "Server Error"});
            }
        }
    };


    exports.deleteUser = async (req, res, next) => {
        const id = req.params.id;

        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({success: false, error: "User not found"});
            }
            await user.remove();
            return res.status(200).json({success: true, data: {}});
        } catch (err) {
            console.error(err);
            return res.status(500).json({success: false, error: "Server Error"});
        }
    };

    exports.getUserByNameNId = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username: username, password: password});
        if (! user) {
            return res.status(401).json({success: false, message: 'Invalid credentials'});
        }
        return res.status(200).json({success: true, message: 'Login successful', data: user});
    } catch (err) {
        console.error(err);
        return res.status(500).json({success: false, error: 'Server Error'});
    }
};
