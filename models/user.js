const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email:{
    type : String,
    required : true
    } ,
    password:{
        type : String,
        required : true
    } ,
    date :{
        type: Date,
        default : Date.now
    },
    cart :{
        type : Array,
        default : []
    },
    balance :{
        type : Number,
        default : 0
    },
    card :{
        type : Number,
    },
    icon :{
        type : String,
    }
},{collection : 'Users'});
const User= mongoose.model('User',UserSchema);

module.exports = User;