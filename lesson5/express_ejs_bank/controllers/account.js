const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const User = require('../models/User');

// Controler MVC
router.get('/', (req, res) => {
    //res.render('index', { user: user });
});

router.get('/addAccount', (req, res) =>{
    res.render('addAccount', {user : user});
});

router.post('/addAccount', async (req, res) => {
    const newAccount = req.body.newAccount;
    const newBalance = req.body.balance;

    try {
       
    } catch (error) {
        
    }
});
router.get('/transfer', (req, res) => {
   res.render('transfer', {user : user});
});

router.post('/transfer', async (req, res) => {
    const fromAccount = user.accounts.find(account => account.number === req.body.fromAccount);
    const toAccount = user.accounts.find(account => account.number === req.body.toAccount);
    const amount = parseFloat(req.body.amount);

    if (fromAccount && toAccount && fromAccount !== toAccount && amount > 0 && fromAccount.balance >= amount) {
        fromAccount.balance -= amount;
        toAccount.balance += amount;
        
        try {
            const transaction = new Transaction({
                amount: amount,
                fromAccount: fromAccount.number,
                toAccount: toAccount.number
            });

            await transaction.save();
            res.redirect('/');
        } catch (error) {
            console.log(`DB Error: ${error.message}`);
            res.redirect('/');
        }        
    }
});

router.get('/transactions', async (req, res) => {
    if (!req.user) return res.redirect('/login');

    try {        
        const transactions = await Transaction.find();
        res.render('transactions', { transactions: transactions });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


module.exports = router;