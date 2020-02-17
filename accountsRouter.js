const express = require('express');

const db = require('./data/dbConfig.js');

const router = express.Router();

//get all accounts
router.get('/', (req, res) => {
    db('accounts')
    .then(accounts => {
        res.status(200).json(accounts);
    })
    .catch(error => {
        res.status(500).json({ message: "Failed to get accounts"});
    })
});

//get account by id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db('accounts')
    .where({ id })
    .first()
    .then(account => {
        res.status(200).json(account);
    })
    .catch(error => {
        res.status(500).json({message: "Could not locate account with specified ID"});
    })
});

//create new account
router.post('/', (req, res) => {

    const info = req.body;
    console.log(info);
        db('accounts')
        .insert(info)
        
        .then(account => {
            res.status(201).json({ message: "Successfully created account"});
        })
        .catch(error =>{
            res.status(500).json({ message: "Error occurred, account not created" });
        });
    
});


//update an account by id
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    db('accounts')
    .where({ id })
    .update(updates)
    .then(count => {
        res.status(200).json(count);
    })
    .catch(error => {
        res.status(500).json({ message: "Failed to update the account"});
    });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    db('accounts')
    .where({ id })
    .del()
    .then(count => {
        res.status(200).json({ message: "Account successfully deleted"});
    })
    .catch(error => {
        res.status(500).json({ message: "An error occurred, account not deleted"});
    });
});




module.exports = router;