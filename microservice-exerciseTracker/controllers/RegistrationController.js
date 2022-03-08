const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');

router.post('/users', (req, res) => {
    const { username } = req.body;
    let user = User.Find(username);
    if (user) {
        return res.send(user);
    }
    user =  User.Create(username);
    return res.send(user);
});


module.exports = router;