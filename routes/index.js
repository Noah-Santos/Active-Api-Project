const express = require('express');
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')

// default startup page will be the welcome page
router.get('/', function (req, res){
    res.render('pages/login')
})

// router.get('/register', (req, res)=>{
//     res.render('register')
// })

// if the user tries to access the dashboard, the middleware ensureAuthenticated will check if they are signed in and send the user to the login page if they are not logged in
router.get('/account', ensureAuthenticated, (req, res)=>{
    res.render('pages/account', {
        user:req.user
    })
})

module.exports = router;