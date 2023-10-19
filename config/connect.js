const mongoose = require('mongoose');

const connectDB = (url) => {
    // {} allows for options to modify the connection like data type
    return mongoose.connect(url,{})
}

module.exports = connectDB