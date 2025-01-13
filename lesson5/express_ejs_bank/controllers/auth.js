const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transaction = require('../models/transaction');

// Login
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    try {
        const user = await User.findOne({userName});
        if (user && user.password === password) {
            const transactions = await Transaction.find();
            res.render('transactions', { transactions: transactions });
        } else {
            res.redirect('/register');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

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

        await user.save();
        res.redirect('/login');

    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.render('register', {error: error.message});
    }
});

module.exports = router;