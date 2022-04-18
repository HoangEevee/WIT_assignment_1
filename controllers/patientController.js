// import demo model
// TO BE REPLACED WITH MONGODB
const patientData = require('../models/patientModel')

const getPatientData = (req, res) => {
    res.send(patientData)
}

const getDataByPatient = (req, res) => {
    // search id
    const data = patientData.find(data => data.patient_id == req.params.patient_id)

    // return data if id exists
    if (data) {
        res.send(data)
    } else {
        // temporarily set 404 response
        res.sendStatus(404)
    }
}

module.exports = {
    getPatientData,
    getDataByPatient
}