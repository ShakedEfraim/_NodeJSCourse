const express = require('express');
const bodyParser = require('body-parser');
const resLogger = require('./middlewares/response-logger');
const authMiddleware = require('./middlewares/auth');

// --DB & Config Imports
const mongoose = require('mongoose');
const Transaction = require('./models/transaction');
const dotenv = require('dotenv');

// --Controllers Import --
const accoutController = require('./controllers/account');
const authController = require('./controllers/auth');

const app = express();
const port = 3000;

//Use tamplates Engine for EJS
app.set('view engine', 'ejs');

//Define a public static folder
app.use(express.static('public'));

app.use(resLogger);
dotenv.config();

//Define a body parser for forms
app.use(bodyParser.urlencoded({ extended: true }));

// --Use Mongo--
//const transactions = [];
const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString, {useNewUrlParser: true})
.then(() => {
    console.log("Mongo DB connected Successfully!");
})
.catch((err) => {
    console.log(`Mongo DB Failed to connect xxx: ${err.message}`);
});

app.use('/', authController);
app.use('/auth', authController);
app.use('/accounts', authMiddleware, accoutController);

app.get('/', (req, res) => {
    res.render('login');
});

app.listen(port, () => {
    console.log(`Banking app listening at http://localhost:${port}`);
});