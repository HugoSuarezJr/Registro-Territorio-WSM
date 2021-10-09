const mongoose = require('mongoose');

const Schema = mongoose.Schema

const contactSchema = new Schema({
    territoryNum: String,
    name: String,
    territoryName: String,
    phone: String,
    date: Date,
    notes: String
},
{
    timestamps: {
        creatdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact