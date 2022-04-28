const mongoose = require('mongoose') 

const thresholdSchema = new mongoose.Schema({
    lower: Number,
    upper: Number,
})

const timestampSchema = new mongoose.Schema({
    time: Date,
    glucose: Number,
    message: String
})
const schema = new mongoose.Schema({ 
    patient: String,
    clinicianId: mongoose.Types.ObjectId,
    clinician: String,
    glucoseRecord: Boolean,
    glucoseThreshold: [thresholdSchema],
    glucoseTimestamp: [timestampSchema],
    weightRecord: Boolean,
    weightThreshold: [thresholdSchema],
    weightTimestamp: [timestampSchema],
    insulinRecord: Boolean,
    insulinThreshold: [thresholdSchema],
    insulinTimestamp: [timestampSchema],
    exerciseRecord: Boolean,
    exerciseThreshold: [thresholdSchema],
    exerciseTimestamp: [timestampSchema],
})

const Patient = mongoose.model('Patient', schema) 
module.exports = Patient