const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();
require('./db/connect');

const people = require('./routes/people-controller');
const auth = require('./routes/auth');
const connectDB = require('./db/connect');

// static assets
app.use(express.static('./public'));
// parse from data
app.use(express.urlencoded({ extended: false }));
// parse JSON data
app.use(express.json());

// routes/router
app.use('/api/people', people);
// app.use('/api/people', people);
app.use('/login', auth);

// Server Listen
const initServer = async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(5000, ()=>{
            console.log('Server listening on port 5000')
        });
    }catch(e){
        console.log(e);
    }
}

initServer();