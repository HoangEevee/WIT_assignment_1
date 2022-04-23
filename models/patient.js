const mongoose = require('mongoose') 

const schema = new mongoose.Schema({ 
    patient_name: String,
    clinician_id: mongoose.Types.ObjectId,
    health_data: [
        {
            date: Date,
            glucose: {
                value: mongoose.Schema.Types.Decimal128,
                comment: String,
            },
            weight: {
                value: mongoose.Schema.Types.Decimal128,
                comment: String,
            },
            insulin: {
                value: Number,
                comment: String,
            },
            exercise: {
                value: Number,
                comment: String,
            } 
        }
    ]
}) 

const Patient = mongoose.model('Patient', schema) 
module.exports = Patient