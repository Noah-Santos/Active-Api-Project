const express = require('express');
const router = express.Router();

// Below here is to work with the router application

let People = require('../models/person');

router.get('/', async(req,res)=>{
    try {
        let people = await People.find({});
        res.json(people);
    } catch (error) {
        console.log(error)
    }
});

router.post('/', async(req,res)=>{
    try {
        let allPeople = await People.find({});
        const {name, age, task} = req.body;

        if(!task){
            task = 'none';
        }

        let newPerson = await People.create({name:name, age:age, task:task, userID:allPeople.length+1});
        allPeople = await People.find({});
        res.json(allPeople);

    } catch (error) {
        console.log(error);
    }
});

// put request
router.put('/:userID', async(req,res)=>{
    try {
        let {userID} = req.params;
        let {name, age, task} = req.body;
        let changePeople = People.findById(userID)

        if(!name){
            name = changePeople.name;
        }
        if(!age){
            age = changePeople.age;
        }
        if(!task){
            task = changePeople.task;
        }

        let people = await People.findOneAndUpdate({userID:userID}, {name:name, age:age, task:task});
        res.json(people);
    } catch (error) {
        console.log(error);
    }
})

// delete request
router.delete('/:userID', async(req, res)=>{
    try {
        const {userID} = req.params;
        let person = await People.findOneAndDelete({userID:userID});
        res.json(person);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;