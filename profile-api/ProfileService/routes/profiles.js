const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');

const storageinfo = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './profileimages/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const filetype = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(new Error('Image must be in jpeg or png format'), false);
    }
};

const upload = multer({ storage: storageinfo, fileFilter: filetype });

const Profiles = require("../models/profile");

router.get('/hello', (req, res, next) => {
    res.status(200).json({
        message: 'Its working here'
    })
});

router.get('/:username', (req, res, next) => {
    const usernameToFind = req.params.username;
    Profiles.findOne({ username: usernameToFind }).exec().then(doc => {
        if (doc != null) {
            console.log(doc);
            res.status(200).json(doc);
        }
        else {
            console.log(doc);
            res.status(404).json({ message: 'No entry with the provided username found' });
        }
    }).catch(err => {
        console.log(err);
        res.status(404).json({ message: 'Error in processing this request' });
    });
});

router.post('/', upload.single('profileimage'), (req, res, next) => {
    var path = "";
    if (req.file != null) {
        path = req.file.path;
    }
    const profile = new Profiles({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        emailId: req.body.emailId,
        contactnumber: req.body.contactnumber,
        age: req.body.age,
        profileimagelocation: path
    });

    Profiles.findOne({ username: req.body.username }).exec(function (err, user_found) {
        if (user_found != null) {
            res.status(400).json({
                message: 'Username already exists, provide another name'
            })
        }
        else {
            profile.save().then(result => {
                console.log(result);
            }).catch(err => console.log(err));

            res.status(201).json({
                message: "sucessfully created new user"
            });
        }
    });
});

router.delete('/:username', (req, res, next) => {
    const id = req.params.username;
    Profiles.findOne({ username: id }).exec(function (err, user_found) {
        if (user_found != null) {
            Profiles.deleteOne({ username: id }).exec().then(result => {
                res.status(200).json({ message: "User: " + id + " Successfully deleted" });
            }).catch(errdeleting => {
                console.log(errdeleting);
                res.status(500).json({
                    error: errdeleting
                });
            });
        }
        else {
            res.status(404).json({
                message: "No user with the given username found",
            });
        }
    });
});

router.get('/uploads/:imagename', (req, res, next) => {
    const imageName = req.params.imagename.replace("%", " ");
    const path = "profileimages/" + imageName;
    fs.access(path, fs.F_OK, (err) => {
        if (err) {
            console.error(err);
            res.status(404).json({ message: "No image with the name found" });
        }
        else {
            res.status(200).sendFile(path, { root: '.' });
        }
    })
});

router.patch('/updateprofileimage/:username', upload.single('profileimage'), (req, res, next) => {
    var path = "";
    if (req.file != null) {
        path = req.file.path;
    }
    const id = req.params.username;
    Profiles.updateOne({ username: id }, {
        $set: { profileimagelocation: path }
    }).exec().then(
        result => {
            console.log(result);
            res.status(200).json({ message: "sucessfully updated profile image" });
        }
    ).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


router.patch('/:username', (req, res, next) => {
    const id = req.params.username;
    Profiles.updateOne({ username: id }, {
        $set: { firstname: req.body.newFirstName, lastname: req.body.newLastName, emailId: req.body.newemailId, contactnumber: req.body.newContactNumber }
    }).exec().then(
        result => {
            console.log(result);
            res.status(200).json({ message: "sucessfully updated user details" });
        }
    ).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;
