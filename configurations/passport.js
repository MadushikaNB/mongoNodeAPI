//const = require(' '); 
//core module
const path = require('path');

const User = require(path.join(__dirname,'../models/user'));
const config = require(path.join(__dirname,'../configurations/config'));

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports =function(passport){
let  opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;
//opts.issuer = 'accounts.examplesoft.com';
//opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts,(jwt_payload, done)=>{
    console.log(jwt_payload);
     User.getUserById(jwt_payload._id,(err,user)=>{
         if(err){
             return done(err,false);
         }
         if(user){
            return done(null,user);
         }
         else{
             return done(null,false);
         }    
         })
})); 

}

// User.findOne({id: jwt_payload.sub}, function(err, user) {
//     if (err) {
//         return done(err, false);
//     }
//     if (user) {
//         return done(null, user);
//     } else {
//         return done(null, false);
//         // or you could create a new account
//     }
// });