const express = require('express');
const router = express.Router();
const User = require('../models/user');
// Register
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        const user = new User({
            userName: req.body.userName,
            password: req.body.password,
            name: req.body.name
        });

        await User.save();
        res.redirect('/auth/login');

    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.render('register', {error: error.message});
    }
});

// Login
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {

});

module.exports = router;