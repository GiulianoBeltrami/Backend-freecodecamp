const mongoose = require('mongoose');
const userModel = require('../models/UserModel.js');

exports.CreateUser = (req, res) => {
    const { username } = req.body;
    userModel.create({ username: username })
        .then(user => {
            res.json({
                "username": user.username ,
                "_id": user._id
            });
        })
        .catch(err => {
            console.error(err);
        })
}

exports.CreateExercise = (req, res) => {
    
}

