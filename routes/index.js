const express = require("express")
const router = express.Router();
const Contact = require('../models/Contact')


router.get('/', (req, res, next) => {
    res.json({
        message: 'No Tocar'
    })
});

router.post('/Do-Not-Call-Contacts', (req, res, next) => {
    console.log('Do not call', req.body)
    Contact.create(req.body)
    res.json({info: "whatup"})
})

module.exports = router;
