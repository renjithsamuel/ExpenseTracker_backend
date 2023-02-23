const mongoose = require('mongoose');


const ExpenseSchema = new mongoose.Schema({
    name:{
        type : String,
        trim : true,
        required : [true,'Please add some text']
    },
    amount :{
        type : Number,
        required : [true,'Please add a possitive number']
    },
    desc : {
        type : String
    }
});



module.exports = mongoose.model('Expenses',ExpenseSchema);

