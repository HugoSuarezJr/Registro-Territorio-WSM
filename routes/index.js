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

// Display Selected Contact
router.get('/HouseInfo/:id', (req,res)=>{
    Contact.findById(req.params.id).then(contact =>{
      res.json({contact})
    })
})

// Add Contact function 
router.post('/Contacts', (req, res, next) => {
    console.log('Do not call', req.body)
    Contact.create(req.body).then(response =>{
        res.json({message: "success", newContactId: response._id, newHouse: response.houseNumber, newStreet: response.street})
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

// Delete Contact function
router.post('/Update', (req, res, next) => {
    console.log(req.body)
    let id = req.body.contact._id
    let changes = req.body
    Contact.findByIdAndUpdate(
        id,
        changes,
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        }
      );
})



module.exports = router;
