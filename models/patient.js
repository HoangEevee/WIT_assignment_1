const mongoose = require('mongoose') 

const schema = new mongoose.Schema({ 
    patient_name: { type: String, required: true }
}) 

const Author = mongoose.model('Patient', schema) 
module.exports = Author