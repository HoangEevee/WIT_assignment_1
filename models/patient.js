const mongoose = require('mongoose') 

const schema = new mongoose.Schema({ 
    patient_name: String,
    clinician_id: mongoose.Types.ObjectId,
    health_data: [
        {
            date: String,
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
    ],
    timeseries: {
        glucose: {
            threshold_upper: mongoose.Schema.Types.Decimal128,
            threshold_lower: mongoose.Schema.Types.Decimal128,
        },
        weight: {
            threshold_upper: mongoose.Schema.Types.Decimal128,
            threshold_lower: mongoose.Schema.Types.Decimal128,
        },
        insulin: {
            threshold_upper: Number,
            threshold_lower: Number,
        },
        exercise: {
            threshold_upper: Number,
            threshold_lower: Number,
        }
    }
}) 

const Patient = mongoose.model('Patient', schema) 
module.exports = Patient