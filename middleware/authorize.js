const authorize = (req, res, next) => {
    /* an example of how an API key can be used. NOT PROPER FOR REAL USE
    This is just a small example for now */
    const {apiKey} = req.query;
    if(apiKey==="ping"){
        console.log('Authorized Acess Granted');
        // This modifies the request object for the next response
        req.user = {name:"Jimmy Johns", id:123456}
        next();
    }else{
        console.log('Authorized Acess Denied');
        res.send({results:[], status: 401, message:"AccessDenied"});
        next();
    }
}
module.exports = authorize;

/*
In query params in postman, you need to set the key to apiKey and the value to ping
*/