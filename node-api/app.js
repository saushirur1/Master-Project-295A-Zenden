const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const profile_routes = require('./ProfileService/routes/profiles.js');
//const order_routes = require('./ProfileService/routes/misc.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://saushirur1:saushirur@cluster0-52cvp.mongodb.net/test?retryWrites=true');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*
app.use('/',(req,res,next) => {
    res.status(200).json({
        message: "Welcome to Profile service"
    });
});*/

app.use('/profiles', profile_routes);
//app.use('/orders',order_routes);

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Header','origin');
});

app.use((req,res,next) =>
{
const error = new Error('Not found');
error.status = 404;
next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});
module.exports = app;