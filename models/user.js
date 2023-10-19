const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({
    first_name :{
        type : String,
        required : true
    } ,
    last_name:{
        type : String,
        required : true
    } ,
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
    games :{
        type : Number,
        default : 0
    },
    wins :{
        type : Number,
        default : 0
    },
    loses :{
        type : Number,
        default : 0
    },
    ties :{
        type : Number,
        default : 0
    },
    status:{
        type : String,
        default : 'none'
    }
},{collection : 'Users'});
const User= mongoose.model('User',UserSchema);

module.exports = User;