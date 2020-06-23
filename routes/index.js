const express = require("express")
const router = express.Router();
const Contact = require('../models/Contact');
const { response } = require("express");


router.get('/', (req, res, next) => {
    res.json({
        message: 'No Tocar'
    })
});

router.get('/Contacts', (req, res, next) => {
    Contact.find().then(contactsFromDB => {
    res.json({ contacts: contactsFromDB})
})
})

router.post('/Contacts', (req, res, next) => {
    console.log('Do not call', req.body)
    Contact.create(req.body).then(response =>{
        res.json({message: "success", newContactId: response._id})
    }).catch(err => res.json({err}))
})

// Delete function ---->
// router.post('/Delete', (req, res, next) => {
//     let id = req.body._id
//     Contact.findByIdAndDelete(id, function (err) {
//         if(err) console.log(err);
//         console.log("Successful deletion");
//       });
// })

module.exports = router;
