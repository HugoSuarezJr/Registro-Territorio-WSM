const express = require("express")
const router = express.Router();
const Contact = require('../models/Contact');
const { response } = require("express");


router.get('/', (req, res, next) => {
    res.json({
        message: 'No Tocar'
    })
});

router.get('/Do-Not-Call-Contacts', (req, res, next) => {
    Contact.find().then(contactsFromDB => {
    res.json({ contacts: contactsFromDB})
})
})

router.post('/Do-Not-Call-Contacts', (req, res, next) => {
    console.log('Do not call', req.body)
    Contact.create(req.body).then(response =>{
        res.json({message: "success", newContactId: response._id})
    }).catch(err => res.json({err}))
})

module.exports = router;
