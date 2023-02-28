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
    },
    date: {
        type: Date,
        default : new Date()
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchemas',
        required: true
    }


});



module.exports = mongoose.model('Expenses',ExpenseSchema);

