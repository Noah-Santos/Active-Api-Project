const logger = (req,res,next)=>{
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time);
    // this is an example of terminating your code in the middleware
    // res.send('testing')
    next() // without next, the process will never finish and will never make it to the response
}
// gets the date, url, and access method used
module.exports = logger;