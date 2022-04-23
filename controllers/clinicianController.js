const mongoose = require('mongoose')
const Clinician = require('../models/clinician')

const clinicianData = require("../models/patientModel.js")
// prolly more suited for clinician but eh testing
/*const getAllClinicianData = async (req, res, next) => {
    try {
        const clinicians = await Clinician.find().lean()
        return res.render('allPatients', {data: clinicians, layout: 'clinician_main' })
    } catch (err) {
        return next(err)
    }   
}*/

const getAllClinicianData = (req, res) => {
    res.render("allPatients", {layout: "main", data: clinicianData})

}

module.exports = {
    getAllClinicianData,
}