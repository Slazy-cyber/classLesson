const mongoose = require('mongoose');

let customersSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, unique: [true, "Email already exists"] },
    password: { type: String, required: true },

})

module.exports = mongoose.model('customers', customersSchema);