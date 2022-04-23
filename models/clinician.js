const mongoose = require('mongoose') 

const schema = new mongoose.Schema({ 
    clinician_name: String,
    patients: [
        {
            patient_id: mongoose.Types.ObjectId,
        }
    ]
}) 

const Clinician = mongoose.model('Clinician', schema) 
module.exports = Clinician