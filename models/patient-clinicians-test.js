const mongoose = require('mongoose') 

const glucoseSchema = new mongoose.Schema({
    lower: Number,
    higher: Number,
})

const timestampSchema = new mongoose.Schema({
    time: Date,
    glucose: Number,
})
const schema = new mongoose.Schema({ 
    patient: String,
    clinician: String,
    glucose: [glucoseSchema],
    timestamp: [timestampSchema],
}) 

const PatientClinician = mongoose.model('patient-clinicians-test', schema) 
module.exports = PatientClinician