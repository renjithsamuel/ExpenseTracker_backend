const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required : false
    },
    budget:{
        type:Number,
        required : [true , 'please add your budget']
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
    updatedAt : {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('users',userSchema);