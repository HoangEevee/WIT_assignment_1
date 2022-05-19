const mongoose = require('mongoose') 

const schema = new mongoose.Schema({
    title: String,
    firstName: String,
    lastName: String,
    dob: String,
    email: String,
    emailAlt: String,
    contactNumber: String,
    patients: [
        {
            patient_id: mongoose.Types.ObjectId,
        }
    ]
}) 

const Clinician = mongoose.model('Clinician', schema) 
module.exports = Clinician