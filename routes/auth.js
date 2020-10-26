const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
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

    bcrypt.hash(password,12)
    .then(hashedpassword => {
        const encodeUser = new User({
            email,
            password:hashedpassword,
            name
        })
        console.log(encodeUser);
        encodeUser.save()
        .then(user=>{
            return res.status(200).send('User saved successfully');
        })
        .catch(err=>{
            return res.status(400).send('Some error ocuured in saving the data');
        })
    })
 
})

router.post('/signIn',(req,res)=>{
   // const {email,password} = req.body;
    let {email,password} = req.body;

    if(!email && !password){
        return res.status(422).json({error:"Missing fields"});
    }
    User.findOne({email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"User not found"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch =>{
            if(doMatch){
                return res.status(200).json({message:"Sign In Successfully"})
            }
            else{
                return res.status(422).json({error:"Invalid login credentails"})
            }
        })
        .catch(error=>{
            console.log(error);
        })
    })

})

router.get('/getUser',(req,res)=>{
    let {email } = req.query;
    // console.log(email);
    if(!email){
        res.status(422).json({error:"Email is required"});
    }
    User.findOne({email})
    .then(savedUser=>{
        if(!savedUser){
            res.status(422).json({error:"User not found"})
        }
        else{
            res.send(savedUser);

        }
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports = router;