const { Schema, model } = require('mongoose');


const customerModel = new Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
}, { timestamps: true });

const Customer = model('customer', customerModel);

module.exports = Customer;