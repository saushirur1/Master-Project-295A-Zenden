const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    user: String,
    messages:[],
});

module.exports = mongoose.model('MessageSchema', messageSchema)