
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');

//custom module
const config = require(path.join(__dirname,'../configurations/config'));

//user schema
var userSchema = mongoose.Schema({
    username:{
        type:String
       
    },
    password:{
        type:String,
        required :true
    }

});

var userData = module.exports = mongoose.model('userdata',userSchema);

module.exports.getUserById = function(_id,callback){
    userData.findById(_id,callback);
};

module.exports.getUserByUsername = function(username,callback){
    var query = {username:username};
    userData.findOne(query,callback);
   /// callback(null,query);
    console.log(query);
};

module.exports.addUser = function(newUser,callback){
    bcrypt.genSalt(10,(err,salt)=> {
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err){
                throw err;
            }
            newUser.password= hash;
            newUser.save(callback);
        });
    });
     
};


module.exports.comparePassword = function(candidatePassword,hash,callback){
    console.log(candidatePassword);
    console.log(hash);
     bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
         if(err){
             
             throw err;
         }
         else{
           callback(null,isMatch);
           console.log("matching ok....");
         }

     });
    
};