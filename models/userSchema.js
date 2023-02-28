const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, 'Please enter a username']
    },
    password : {
        type: String,
        required: [true, 'Please enter a password']
    },
    amount:{
        type:Number,
        required : [true , 'please add your budget']
    }
});


module.exports = mongoose.model('userSchemas',userSchema);