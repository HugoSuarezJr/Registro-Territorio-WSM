const mongoose = require('mongoose');

const Schema = mongoose.Schema

const contactSchema = new Schema({
    name: String,
    address: String,
    phone: String
},
{
    timestamps: {
        creatdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact