const mongoose = require('mongoose') 

const thresholdSchema = new mongoose.Schema({
    lower: Number,
    upper: Number,
})

const timestampSchema = new mongoose.Schema({
    time: Date,
    value: Number,
    message: String
})

const stringSchema = new mongoose.Schema({
    timestamp: Date,
    message: String
})

const schema = new mongoose.Schema({ 
    clinicianId: mongoose.Types.ObjectId,
    registeredDate: Date,
    activeDays: Number,
    title: String,
    firstName: String,
    lastName: String,
    dob: String,
    email: String,
    contactNumber: String,
    emergencyName: String, 
    emergencyNumber: String,
    glucoseRecord: Boolean,
    glucoseThreshold: thresholdSchema,
    glucoseTimestamp: [timestampSchema],
    weightRecord: Boolean,
    weightThreshold: thresholdSchema,
    weightTimestamp: [timestampSchema],
    insulinRecord: Boolean,
    insulinThreshold: thresholdSchema,
    insulinTimestamp: [timestampSchema],
    exerciseRecord: Boolean,
    exerciseThreshold: thresholdSchema,
    exerciseTimestamp: [timestampSchema],
    supportMessages: [stringSchema],
    clinicianNotes: [stringSchema]
})

const Patient = mongoose.model('Patient', schema) 
module.exports = Patient
