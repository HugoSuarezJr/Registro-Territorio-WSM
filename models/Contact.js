const mongoose = require('mongoose');

const Schema = mongoose.Schema

const contactSchema = new Schema({
    territoryNum: Number,
    name: String,
    houseNumber: String,
    street: String,
    city: String,
    zipCode: String,
    phone: String,
    date: Date
},
{
    timestamps: {
        creatdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact