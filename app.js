// Express
const express = require('express')
const app = express()
app.use(express.static('public')) // define where static assets live
// POST requests, delete json when we do mongo
app.use(express.json()) // needed if POST data is in JSON format
app.use(express.urlencoded({ extended: false }))

// Handlebars stuff
const exphbs = require('express-handlebars')
app.engine(
    'hbs',
    exphbs.engine({
        extname: 'hbs',
        helpers: {
            outOfThreshold: (value, lower, higher) => {return value < lower || value > higher}
        }
    })
)
app.set('view engine', 'hbs')

// connect to database
require('./models/db.js')

//middleware to see all request in terminal
app.use((req, res, next) => {
    console.log("message arrived: " + req.method + " " + req.path)
    next();
})


// connect to routers
const mainRouter = require('./routes/mainRouter')
const patientRouter = require('./routes/patientRouter')
const clinicianRouter = require('./routes/clinicianRouter')

// send HTTP requests to routers
app.use('/', mainRouter)
app.use('/patient', patientRouter)
app.use('/clinician', clinicianRouter)


app.listen(process.env.PORT || 8080, () => {
    console.log('Diabetes@Home is listening...')
})
