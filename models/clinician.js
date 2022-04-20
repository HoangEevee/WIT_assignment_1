const mongoose = require('mongoose') 

const schema = new mongoose.Schema({ 
    clinician_name: String,
    patients: [
        {
            patient_id: mongoose.Types.ObjectId,
            time_series: {
                glucose: {
                    to_be_recorded: Boolean,
                    threshold_upper: mongoose.Schema.Types.Decimal128,
                    threshold_lower: mongoose.Schema.Types.Decimal128,
                },
                weight: {
                    to_be_recorded: Boolean,
                    threshold_upper: mongoose.Schema.Types.Decimal128,
                    threshold_lower: mongoose.Schema.Types.Decimal128,
                },
                insulin: {
                    to_be_recorded: Boolean,
                    threshold_upper: Number,
                    threshold_lower: Number,
                },
                exercise: {
                    to_be_recorded: Boolean,
                    threshold_upper: Number,
                    threshold_lower: Number,
                }

            }
        }
    ]
}) 

const Clinician = mongoose.model('Clinician', schema) 
module.exports = Clinician