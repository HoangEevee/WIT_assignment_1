const mongoose = require('mongoose') 

const schema = new mongoose.Schema({ 
    patient_name: { type: String, required: true },
    glucose: mongoose.Decimal128
}) 

const Patient = mongoose.model('Patient', schema) 
module.exports = Patient