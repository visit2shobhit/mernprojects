const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");

router.post('/Signup',(req,res)=>{
    let {name,email,password,city} = req.body;
    if(!email || !name || !password){
        return res.status(400).send('Missing Fields!');
    }
    User.findOne({
        email,
        password
    })
    .then((savedUser)=>{
        if(savedUser){
            return res.status(400).send('User already exist!');
        }
    });
    const userData = new User({
        name,
        email,
        password,
        city
    });
 
    console.log(userData);
    userData.save()
    .then(user=>{
        return res.status(200).send('User saved successfully');
    })
    .catch(err=>{
        return res.status(400).send('Some error ocuured in saving the data');
    })
})


module.exports = router;