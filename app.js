
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
//core module
const path = require('path');
//custom module
const route = require(path.join(__dirname, '/routes/route'));
const config = require(path.join(__dirname, '/configurations/config'));


mongoose.connect(config.mongodb.database);

mongoose.connection.on('connected',()=>{
    console.log('connection success');
});

//err
mongoose.connection.on('error',(err)=>{
    console.log('connection error');
});

const app = express();

//allow request from different domain
 app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
   });


//body parser middlewear
app.use(bodyparser.json());


//passport middlewear
app.use(passport.initialize());
app.use(passport.session());

require('./configurations/passport')(passport);
app.use(route);

//home page
 app.get('/',(req,res)=>{
     res.send('Express API');
 }); 

app.listen(config.server_port,(err)=>{
    if(err){
        console.log("server error");
    }
    else{
    console.log("server started port"+config.server_port);
    }
});