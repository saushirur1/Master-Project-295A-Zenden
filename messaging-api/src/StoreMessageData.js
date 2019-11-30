const mongoose = require('mongoose')
const MessageSchema = require('../models/messages.js')
//var accessSockets = require('./server.js')

class storeMessageData
{
    constructor()
    {
        console.log('Connecting to mongodb cluster')
        this.connecttomongodb()
    }

    connecttomongodb()
    {
        mongoose.connect("mongodb+srv://saushirur1:saurabh@messagingcluster-ycfpg.mongodb.net/test?retryWrites=true&w=majority")
    }

    storeMessage(sender,messageToStore)
    {
        MessageSchema.find({user: sender}, function(err,docs)
        {
            if(docs.length)
            {
                MessageSchema.updateOne({user: sender},{"$push" : {"messages": messageToStore}},
                function(err,raw)
                {
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        console.log("success")
                    }
                });    
            }
            else
            {
                var messageArray = []
                messageArray.push(messageToStore)
                const newMessageSchema = new MessageSchema({
                    _id: new mongoose.Types.ObjectId(),
                    user: sender,
                    messages: messageArray
                });
                newMessageSchema.save().then(result =>
                    {
                        console.log(result);
                    }).catch(err => console.log(err));
            }
        });
    }

    /*
    retrieveUnsentMessages(userName)
    {
        MessageSchema.find({user: userName}, function(err,user)
        {
            user.forEach(function(us){
               us.messages.forEach(function(msgs)
               {
                   console.log(msgs);
                   accessSockets.io.to(accessSockets.users[userName]).emit('message',msg);
               });
            });
        })
    }*/
    
}

module.exports = storeMessageData