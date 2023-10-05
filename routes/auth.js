const express = require('express');
const router = express.Router();

router.post('/', (req,res)=>{
    console.log(req.body);
    const {name} = req.body;
    if(name){
        return res.json({status:200, data:name});
    }
    res.send('Please provide credentials');
});

module.exports = router;