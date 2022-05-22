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

//show time as DD/MM/YYYY, HH:MM:SS for the shared date in timestamp
const changeTimestampDateFormat = (timeseries) => {
    if (timeseries.length) {
        //show time as DD/MM/YYYY, HH:MM:SS
        timeseries.forEach((element) => {
            element.date = element.date.toLocaleDateString()
        })
        //reverse timestamp so it show newest on top 
        //TODO: might want to change push timestamp to begin of list instead so don't need this
        timeseries = timeseries.reverse() 
    }
}

//show time as DD/MM/YYYY, HH:MM:SS for last inserted element in timestamp
const changeLastTimestampFormat = (lastUpdated) => {
    if (lastUpdated) {
        if (lastUpdated.glucose) {
            lastUpdated.glucose = lastUpdated.glucose.time.toLocaleString()
        }
        if (lastUpdated.weight) {
            lastUpdated.weight = lastUpdated.weight.time.toLocaleString()
        }
        if (lastUpdated.insulin) {
            lastUpdated.insulin = lastUpdated.insulin.time.toLocaleString()
        }
        if (lastUpdated.exercise) {
            lastUpdated.exercise = lastUpdated.exercise.time.toLocaleString()
        } 
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
    return date.match(dateRegex)
}

// calculate engagement ( (days with some data) / (days since registration))
const calculateEngagement = (patient) => {
    const today = new Date()
    const timeseries = patient.timeseries

    if (timeseries.length) {
        last = timeseries[timeseries.length-1].date.toLocaleDateString()
        diff = today - patient.registeredDate
        to_days = Math.floor(diff / (24 * 60 * 60 * 1000))
        if (last.localeCompare((new Date(to_days)).toLocaleDateString()) != 0) {
            to_days += 1
        }
        if (to_days == 0) {
            to_days = timeseries.length
        }
        engagement = timeseries.length / to_days * 100
        return engagement.toFixed(2)
    }
    return 0
    
}

module.exports = {
    changePatientTimestampFormat,
    changeTimestampDateFormat,
    changeLastTimestampFormat,
    isAuthenticated,
    getTodayStart,
    isEmail,
    isDate,
    calculateEngagement,
}