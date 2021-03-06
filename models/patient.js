const mongoose = require('mongoose') 

const thresholdSchema = new mongoose.Schema({
    lower: Number,
    upper: Number,
}, { _id : false }
)

const timestampSchema = new mongoose.Schema({
    time: Date,
    value: {type: Number, required: true},
    message: String
})

const timeseriesSchema = new mongoose.Schema({
    date: {type: Date, required: true, unique: true},
    glucose: timestampSchema,
    weight: timestampSchema,
    insulin: timestampSchema,
    exercise: timestampSchema,
})

const stringSchema = new mongoose.Schema({
    timestamp: Date,
    message: String
})

const schema = new mongoose.Schema({ 
    clinicianId: mongoose.Types.ObjectId, 
    registeredDate: Date,
    title: String,
    firstName: String,
    lastName: String,
    dob: Date,
    email: String,
    contactNumber: String,
    emergencyName: String, 
    emergencyNumber: String,
    timeseries: [timeseriesSchema],
    lastUpdated: {
        glucose: timestampSchema,
        weight: timestampSchema,
        insulin: timestampSchema,
        exercise: timestampSchema,
    },
    glucoseRecord: Boolean,
    glucoseThreshold: thresholdSchema,
    weightRecord: Boolean,
    weightThreshold: thresholdSchema,
    insulinRecord: Boolean,
    insulinThreshold: thresholdSchema,
    exerciseRecord: Boolean,
    exerciseThreshold: thresholdSchema,
    supportMessages: String,
    clinicianNotes: [stringSchema],
    lastComments: [stringSchema],
})

const Patient = mongoose.model('Patient', schema) 
module.exports = Patient
