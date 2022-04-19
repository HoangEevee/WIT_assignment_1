// import demo model
// TO BE REPLACED WITH MONGODB
const Patient = require('../models/patient')

// prolly more suited for clinician but eh
const getAllPatientData = async (req, res, next) => {
    try {
        const patients = await Patient.find().lean()
        return res.render('allPatients', {data: patients})
    } catch (err) {
        return next(err)
    }   
}

const getDataByPatient = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.patient_id).lean()
        if (!author) {
            // patient not in db
            return res.sendStatus(404)
        }
        // found patient
        return res.render('patientData', { oneItem: patient})
    } catch (err) {
        return next(err)
    }
}

/*const insertGlucose = (req, res) => {
    const { today_glucose } = req.body
    patientData.push({ today_glucose })
    return res.redirect('back')
}*/

module.exports = {
    getAllPatientData,
    getDataByPatient,
}
