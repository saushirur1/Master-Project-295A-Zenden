const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const profile_routes = require('./ProfileService/routes/profiles.js');
const morgan = require('morgan')
//const order_routes = require('./ProfileService/routes/misc.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://saushirur1:saushirur@cluster0-gyaeo.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*
app.use('/',(req,res,next) => {
    res.status(200).json({
        message: "Welcome to Profile service"
    });
});*/

// Used to prevent CORS errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', "POST,PATCH,GET,DELETE");
        return res.status(200).json({});
    }
    next();
});

app.use('/profiles', profile_routes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});
module.exports = app;