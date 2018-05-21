const express = require('express');
const path = require('path');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();
//custom module
const User = require(path.join(__dirname,'../models/user'));
const config = require(path.join(__dirname,'../configurations/config'));

//user register
router.post('/register',(req,res,next)=>{
    let newUser = new User({
        username:req.body.username,
        password:req.body.password
    });
    User.addUser(newUser,(err,msg)=>{
        if(err){
            res.json({success:false});
        }
        else{ 
            res.json({success:true});
            console.log(msg);
        }
    })

});

router.post('/login',(req,res,next)=>{
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body);
 User.getUserByUsername(username,(err,user)=>{
     if(err){
         throw err;
     }
     if(!user){
         return res.json({msg:"no user"});
     }
     
else{

// console.log(user);
 User.comparePassword(password,user.password,(err,isMatch)=>{
     if(err){
         throw err;
     }
     if(isMatch){
         console.log("error point is thius");
         var token = jwt.sign(user.toJSON(),config.secret,{
             expiresIn : 60*60*24 
         });
     //user.toJSON()
        res.json({
            success:true,
            token:'JWT'+token,
            user:{
                id:user._id,
                name:user.username
            }

        });
    }
     else{
            return res.json(false,{msg:"wrong password "});

     }
 })
}
});


})

router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.send('Express');

})
module.exports = router;