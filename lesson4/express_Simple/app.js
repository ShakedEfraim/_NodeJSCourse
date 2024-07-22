const express = require('express');
const customerRoutes = require('./customerRoutes');
const fs = require("fs");
const path = require("path");

let logCounter = 1;

const app = express();
const port = 3000;

//PRE-HANDLER middleware
app.use(express.json());

app.use((req, res, next) =>{
    console.log(`${logCounter++} | Method: ${req.method}`);
    next();
});

app.use('/api/customers', customerRoutes);

app.get('/', (req, res) =>{
    res.send('Hello World');
});
app.get('/api', (req, res) =>{
    res.send({message: 'Hello World'});
});


app.get('/api/search', (req, res, next) =>{
    const { q } = req.query;
    for(let key in req.query){
        console.log(key, req.query[key]);
    }
    const error = new Error('Critical server error');
    error.status = 481;
    if(error){
        next(error);
    } else{
        res.send({'search result' : q});
    }    
});

app.use((req, res, next) => {
   const data = res.send.toString();
   const url = req.url
   const filePath = path.join(__dirname, 'Logs', `log- ${new Date().toDateString()}.txt`);

    fs.writeFile(filePath, data, (err) =>{
        if(err){
            console.error('Error writing to file: ', err);
        } else{
            console.log('Data has been written to', filePath);
        }
    });
    next();
});

//POTS-HANDLER middleware
app.use((err, req, res, next) =>{
    console.log(`Error: ${err.status} - ${err.message}`);
    res.status(err.status || 500).json({error: err.message});
});


app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);
});
