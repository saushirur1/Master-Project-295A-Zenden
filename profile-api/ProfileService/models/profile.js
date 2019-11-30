const mongoose = require('mongoose');

const Schemaprofile = mongoose.Schema({
    username:{type: String, required: true},
    firstname: {type: String, required: true},
    lastname:{type: String, required: true},  
    emailId: {type: String, required: true},  
    contactnumber: {type: String, required: true},
    age: Number,
    profileimagelocation: String
});

module.exports = mongoose.model('Profile', Schemaprofile);
