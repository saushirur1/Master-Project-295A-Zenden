const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Profiles = require("../models/profile");

router.get('/:profile_id',(req,res,next) => {
    const id = req.params.profile_id;
    Profiles.findById(id).exec().then(doc => {
        console.log(doc);
        res.status(200).json(doc['password']);
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.post('/', (req,res,next) =>
{
    const profile = new Profiles({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        password: req.body.password,
        contactnumber: req.body.contactnumber
    });

    profile.save().then(result =>
        {
            console.log(result);
        }).catch(err => console.log(err));

    res.status(201).json({
        message: 'Handling post request for profiles',
        order: profile
    });
});

router.delete('/:profile_id',(req,res,next) =>{
    const id = req.params.profile_id;
    Profiles.remove({_id : id}).exec().then(result =>
         {
            res.status(200).json(result);
         }).catch(err => {
             console.log(errdeleting);
             res.status(500).json({
                 error: errdeleting
             });
         });
});

module.exports = router;
