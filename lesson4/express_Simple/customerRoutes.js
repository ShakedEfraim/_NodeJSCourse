const express = require('express');
const router = express.Router();

const customers = [
    
    { id: 1, name: 'John Doe', address: '123 Main St, Cityville', balance: 1000.00 },
    { id: 2, name: 'Jane Smith', address: '456 Elm St, Townsville', balance: 1500.50 },
    { id: 3, name: 'Michael Johnson', address: '789 Oak St, Villageton', balance: 500.25 },
    { id: 4, name: 'Emily Davis', address: '101 Pine St, Hamletville', balance: 3000.75 },
    { id: 5, name: 'David Brown', address: '222 Maple St, Suburbia', balance: 750.20 },
    { id: 6, name: 'Sarah Wilson', address: '333 Cedar St, Countryside', balance: 1200.00 },
    { id: 7, name: 'Robert Taylor', address: '444 Birch St, Townville', balance: 800.60 },
    { id: 8, name: 'Jennifer Martinez', address: '555 Oak St, Cityville', balance: 2200.30 },
    { id: 9, name: 'William Garcia', address: '666 Pine St, Hamletville', balance: 1750.10 },
    { id: 10, name: 'Mary Hernandez', address: '777 Elm St, Countryside', balance: 900.45 },
    { id: 11, name: 'James Lopez', address: '888 Cedar St, Villageton', balance: 600.90 },
    { id: 12, name: 'Patricia Gonzalez', address: '999 Maple St, Suburbia', balance: 300.00 },
    { id: 13, name: 'Richard Rodriguez', address: '111 Birch St, Townville', balance: 1800.75 },
    { id: 14, name: 'Linda Moore', address: '222 Oak St, Cityville', balance: 950.50 },
    { id: 15, name: 'Charles Young', address: '333 Main St, Hamletville', balance: 2000.25 },
    { id: 16, name: 'Amanda Lee', address: '444 Elm St, Countryside', balance: 1300.80 },
    { id: 17, name: 'Joseph Walker', address: '555 Cedar St, Villageton', balance: 1100.35 },
    { id: 18, name: 'Barbara Perez', address: '666 Maple St, Suburbia', balance: 400.15 },
    { id: 19, name: 'Thomas Hall', address: '777 Birch St, Townville', balance: 1600.60 },
    { id: 20, name: 'Jessica Scott', address: '888 Oak St, Cityville', balance: 700.70 }
];
let body = '';

router.get('/', (req, res, next) =>{
    res.status(200).json(customers);
    next();
});

router.get('/:id', (req, res) =>{
    const id = req.params.id;
    const customer = customers.find(c => c.id === parseInt(id));

    if(customer){                 
        res.status(200).json(customers[id]);
    } else {       
        res.status(404).send(JSON.stringify({message: `Customer ${id} not found`}));
    }    
});

router.post('/' ,(req, res) =>{
    req.on('data', chunk => body += chunk.toString())
    req.on('end', () => {
        let nextId = customers.length + 1;
        const newCustomer = JSON.parse(body);
        newCustomer.id = nextId;
        let valid = customers.push(newCustomer);
        if(valid == nextId){
            res.status(201).json(newCustomer);            
        } else {
            res.status(500).send({message: `Customer was not created`});
        }                    
    }); 
});

router.put('/:id', (req, res) =>{
    let body = '';
    const id = req.params.id;
    req.on('data', chunk => body += chunk.toString())
    req.on('end', () => {
        const updCustomer = JSON.parse(body);
        customers[id - 1] = updCustomer;
        res.status(200).json(updCustomer);                                   
    });
});

router.delete('/:id', (req, res) =>{
    const index = customers.findIndex(customer => customer.id == req.params.id);

    if(index !== -1){
        customers.splice(index, 1);
        res.status(201).json({message: `Customer ${req.params.id} deleted`});
    } else{
        res.status(401).json({message: `Customer ${req.params.id} wasn't deleted`});
    }
});

module.exports = router;