const express = require("express")
const router = express.Router();
const Contact = require('../models/Contact');
const { response } = require("express");


router.get('/', (req, res, next) => {
    res.json({
        message: 'No Tocar'
    })
});

//get all contacts function
router.get('/Contacts', (req, res, next) => {
    Contact.find().then(contactsFromDB => {
    res.json({ contacts: contactsFromDB})
})
})

// Add Contact function 
router.post('/Contacts', (req, res, next) => {
    console.log('Do not call', req.body)
    Contact.create(req.body).then(response =>{
        res.json({message: "success", newContactId: response._id})
    }).catch(err => res.json({err}))
})

// Delete Contact function
router.post('/Delete', (req, res, next) => {
    console.log(req.body)
    let id = req.body._id
    Contact.findByIdAndDelete(id, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
      });
      res.json({
          Deletion: "Successful"
      })
})



module.exports = router;
