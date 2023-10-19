const express = require('express');
const session = require ('express-session');
const flash = require('connect-flash');
const morgan = require('morgan');
const passport = require('passport');
// tells where the passport LocalStrategy is
require('./config/passport')(passport);
// allows the use of .env variables
require('dotenv').config();
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const expressEJSLayout = require('express-ejs-layouts')

// connects the mongodb database to the project
// this means that the connection is the first thing to happen
// makes it so that we don't have to use the connection string when calling models
// process.env tells the code to look in the env to find the variable
try{
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{console.log(`connected on Port: ${process.env.PORT}`)})
    .catch((err)=>{console.log(err)})
} catch(error){
    
}

// development tools
app.use(morgan('tiny'));
// EJS
app.set('view engine', 'ejs');
app.use(expressEJSLayout);
// body parser
// determines the data format
app.use(express.urlencoded({extended: false}));
// express session
app.use(session({
    // session sectret is hashed on serialize
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUnitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// use flash messaging---express
app.use(flash());
app.use((req, res, next) => {
    // creating the messages that we use in other files
    res.locals.success_msg = req.flash('sucess message');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next()
});
// routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/public', express.static('./views/public'));

// allows for a fail save if one of the ports fails
// will only run on the first one that works
app.listen(process.env.PORT || 3000);