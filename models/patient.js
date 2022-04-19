const mongoose = require('mongoose') 

const schema = new mongoose.Schema({ 
    patient_name: { type: String, required: true },
    glucose: { type: Double, required: true }
}) 

const Author = mongoose.model('Patient', schema) 
module.exports = Author