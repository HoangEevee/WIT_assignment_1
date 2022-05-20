const mongoose = require('mongoose')
const Patient = require('../models/patient')
const Clinician = require('../models/clinician')
const passport = require('passport')

const changePatientTimestampFormat = (timeseries) => {
    if (timeseries.length) {
        //show time as DD/MM/YYYY, HH:MM:SS
        timeseries.forEach((element) => {
            if (element.glucose) {
                element.glucose.time = element.glucose.time.toLocaleString()
            }
            if (element.weight) {
                element.weight.time = element.weight.time.toLocaleString()
            }
            if (element.insulin) {
                element.insulin.time = element.insulin.time.toLocaleString()
            }
            if (element.exercise) {
                element.exercise.time = element.exercise.time.toLocaleString()
            } 
        })
        //reverse timestamp so it show newest on top 
        //TODO: might want to change push timestamp to begin of list instead so don't need this
        timeseries = timeseries.reverse() 
    }
}

//show time as DD/MM/YYYY, HH:MM:SS for last inserted element in timestamp
const changeLastTimestampFormat = (lastUpdated) => {
    if (lastUpdated.glucose) {
        lastUpdated.glucose = lastUpdated.glucose.toLocaleString()
    }
    if (lastUpdated.weight) {
        lastUpdated.weight = lastUpdated.weight.toLocaleString()
    }
    if (lastUpdated.insulin) {
        lastUpdated.insulin = lastUpdated.insulin.toLocaleString()
    }
    if (lastUpdated.exercise) {
        lastUpdated.exercise = lastUpdated.exercise.toLocaleString()
    } 
    
}

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    // If user is not authenticated via passport, redirect to login page
    if (!req.isAuthenticated()) {
        return res.redirect('/')
    }
    // Otherwise, proceed to next middleware function
    return next()
}

const getTodayStart = () => {
    // It's called "today" but it will be modified to not be that way
    const today = new Date()
        
    // Check Melb time to UTC
    if (today.getUTCHours < today.getTimezoneOffset()) {
        today.setDate(today.getDate()+1)
    }

    //const today_start = new Date(today.setHours(0,0,0,0))
    //const tmr_start = new Date(today.setDate(today.getDate()+1))

    return new Date(today.setHours(0,0,0,0))
}
// regex from here https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email
const isEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return email.match(emailRegex);
}

// check date in format YYYY-MM-DD. Does not check if month and day valid or not
const isDate = (date) => {
    const dateRegex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/
}
module.exports = {
    changePatientTimestampFormat,
    changeLastTimestampFormat,
    isAuthenticated,
    getTodayStart,
    isEmail,
    isDate
}