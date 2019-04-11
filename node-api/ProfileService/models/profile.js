const mongoose = require('mongoose');

const Schemaprofile = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    password: String,
    contactnumber: String
});

module.exports = mongoose.model('Profile', Schemaprofile);
