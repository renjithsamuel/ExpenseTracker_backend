const Expenses = require('../models/expense_schema');
const userSchemas = require('../models/userSchema');
const mongoose = require("mongoose");
const User = userSchemas;

// const totalbudgets = require('../models/userSchema');
exports.getExpenses = async (req,res,next) => {
    try{
        const expenses = await Expenses.find();
        // console.log(expenses);
        return res.status(200).json({
            success :true,
            count : expenses.length,
            data : expenses
        });}
        catch(err){
            return res.status(500).json({
                success: false,
                Error : "server error"
            })
        }
    }



    exports.getExpensesById = async (req,res,next)=>{
        try{
            const expense = await Expenses.findById(req.params.id);
            if(!expense){
                return res.status(404).json({
                    success : false,
                    error : "No expense Found"
                });
            }
            return res.status(200).json(expense);
        }catch(err){
            return res.status(500).json({
                success : false,
                error : "server error"
            })
        }
    }
    
    exports.postExpense = async (req,res,next) =>{
        console.log(req.body);
        if(req.body.amount == null || req.body.name == null || req.body.desc == null){
            return res.status(400).send("Send correct values");
            // return;
        }
        try{
        let newBody = {
            name : req.body.name, 
            amount : req.body.amount,
            desc  : "",
            date : new Date(req.body.date),
            user : mongoose.Types.ObjectId(req.body.user)

        }
        let expense = await Expenses.collection.insertOne(newBody);
        if(!expense){
            return res.status(400).json({
                success : false,
                error : "send correct values"
            });
        }return res.status(200).json(newBody);
        }catch(err){
            return res.status(500).json({
                success : false,
                error : "server error"
            })
        }
    }


    exports.getTotalBudget = async (req,res,next) => {
        try{
            const totalbudget = await totalbudgets.find();

            console.log(totalbudget);
            return res.status(200).json({
                success :true,
                data : totalbudget[0].amount
            });}
            catch(err){
                return res.status(500).json({
                    success: false,
                    Error : "server error"
                })
            }
        }
    
    exports.updateTotalBudget = async (req,res,next) =>{
        
        if(req.body == null )return res.status(400).send("Send correct values");
        console.log(req.body);
        try{
        let updatedElement = await totalbudgets.updateOne({_id: "63f6600224ffbe84ba4d6bb7"},req.body);

        return res.status(200).json(req.body);
        }catch(err){
            console.log(err);
            return res.status(500).json({
                success : false,
                error : "server error"
            })
        }


    }

    exports.deleteExpenseById = async (req,res,next) => {
        let id = req.params.id; 
        var data = await Expenses.findById(id);
        if(!data){
            return res.status(404).json({
                success : false,
                message : "Cannot find element",
                data : req.body
            })
        }
        else{
        try{
            const deleteelement = data;
            // await deleteelement.remove();
            await Expenses.deleteOne({_id:id}).then((v)=>{
                    return res.status(200).json({ success : true, element : deleteelement, message : "deleted successfully!!" })

            });
            }catch(Err){
                return res.status(500).json({
                    success : false,
                    error : "Server error!!"
                })
            }
        }
    }
    
    exports.deleteExpenseBody = async (req,res,next) => {
        console.log(req.body)
        var data = await Expenses.find(req.body);
        if(!data){
            return res.status(404).json({
                success : false,
                message : "Cannot find element",
                data : req.body
            })
        }
        else{
        try{
            const deleteelement = data[0];
            console.log(deleteelement);
            await deleteelement.remove();
            // await Expenses.deleteOne({_id:id});
           return res.status(200).json({
                success : true,
                element : deleteelement,
                message : "deleted successfully!!"
            })
            }catch(Err){
                return res.status(500).json({
                    success : false,
                    error : "Server error!!"
                })
            }
        }
    }


    exports.updateElementById = async (req,res,next) => {
        let id = req.params.id;
        
        if(!await Expenses.findById(id)){
            return res.status(404).json({
                success : false,
                message : "cannot find the element!"
            });
        }else{
            try{
                const updatedElement = await Expenses.updateOne({_id : id} , req.body);
                // let element = "Updated successfully!" + updatedElement.toString();
                return res.status(200).send(updatedElement);
            }catch(err){
                return res.status(500).json({
                    success : false,
                    error : "Server error"
                })
            }
        }
    }

    exports.loggerFunc = async (req,res,next) => {
        console.log("logging");
        console.log(req.method , req.url);
        next();
    }

    exports.checkAdmin = (req,res,next) =>{
        const isAdmin = false;
        if(!isAdmin){
            return res.status(403).json({
                message: "Admin access required!"
            })
        }
    }


    exports.getExpensesByUser = async (req, res, next) => {
        
        // await Expenses.find({user: (req.params.id)}).populate("user",["_id"])
        // .then((v)=>{
        //     // console.log(v);
        //     return res.status(200).json({success: true, count: v.length, data: v});

        // });
        // res.send("");

        try {
            const userId = req.params.id;
            // Find user with the given userId
            const user = await User.findById(userId);
            if (! user) {
                return res.status(404).json({success: false, error: 'User not found'});
            }
            // Find all expenses with the given userId
            const expenses = await Expenses.find({user: req.params.id}).populate("user",["username"]);
            console.log(expenses);
            return res.status(200).json({success: true, count: expenses.length, data: expenses});
        } catch (err) {
            console.error(err);
            return res.status(500).json({success: false, error: 'Server error'});
        }
    };


