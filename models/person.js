const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Must provide a name'],
        trim: true,
    },
    task:{
        type: String,
        trim: true,
        default: 'none'
    },
    age:{
        type: Number,
        default: 10
    },
    userID:{
        type: Number,
        default: 0
    }
},{collection: 'People'})

module.exports = mongoose.model('Person', PersonSchema);