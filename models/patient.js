const mongoose = require('mongoose') 

const schema = new mongoose.Schema({ 
    patient_name: String,
    glucose: mongoose.Decimal128
}) 

const Patient = mongoose.model('Patient', schema) 
module.exports = Patient