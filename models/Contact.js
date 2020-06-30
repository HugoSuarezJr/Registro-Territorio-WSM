const mongoose = require('mongoose');

const Schema = mongoose.Schema

const contactSchema = new Schema({
    territoryNum: String,
    name: String,
    houseNumber: String,
    street: String,
    city: String,
    zipCode: String,
    phone: String,
    date: String
},
{
    timestamps: {
        creatdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact