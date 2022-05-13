const mongoose = require('mongoose')
const Patient = require('../models/patient')
const Clinician = require('../models/clinician')

const changePatientTimestampFormat = (timestamp) => {
    if (timestamp.length) {
        //show time as DD/MM/YYYY, HH:MM:SS
        timestamp.forEach((element) => {
            element.time = element.time.toLocaleString()
        })
        //reverse timestamp so it show newest on top 
        //TODO: might want to change push timestamp to begin of list instead so don't need this
        timestamp = timestamp.reverse() 
    }
}

//show time as DD/MM/YYYY, HH:MM:SS for last inserted element in timestamp
const changeLastTimestampFormat = (timestamp) => {
    if (timestamp.length) {
        timestamp[timestamp.length-1].time = timestamp[timestamp.length-1].time.toLocaleString()
    }
}

module.exports = {
    changePatientTimestampFormat,
    changeLastTimestampFormat,
}