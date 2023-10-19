const ensureAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()){
        // request.isAuthenticated() will return true if user is logged in
        next();
    } else {
        req.flash('error_msg', 'please login to view this resource');
        res.redirect("/users/login")
    }
}

module.exports = {ensureAuthenticated}

// ensureAuthenticated checks if the user is logged in using passport
// if logged in, it is true and false otherwise