// Express
const express = require('express')
const app = express()
app.use(express.static('public')) // define where static assets live

const flash = require('express-flash')
const session = require('express-session')

// POST requests, delete json when we do mongo
//app.use(express.json()) // needed if POST data is in JSON format
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

// Flash messages for failed logins, and (possibly) other success/error messages
app.use(flash())

// Track authenticated users through login sessions
app.use(
    session({
        // The secret used to sign session cookies (ADD ENV VAR)
        secret: process.env.SESSION_SECRET || 'keyboard cat',
        name: 'demo', // The cookie name (CHANGE THIS)
        saveUninitialized: false,
        resave: false,
        cookie: {
            sameSite: 'strict',
            httpOnly: true,
            secure: app.get('env') === 'production'
        },
    })
)
if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // Trust first proxy
}

// Initialise Passport.js
const passport = require('./passport.js')
app.use(passport.authenticate('session'))

// connect to database
require('./models/db.js')

//middleware to see all request in terminal
app.use((req, res, next) => {
    console.log("message arrived: " + req.method + " " + req.path)
    next();
})


// connect to router
const mainRouter = require('./routes/mainRouter')
//const patientRouter = require('./routes/patientRouter')
//const clinicianRouter = require('./routes/clinicianRouter')

//const clinicianRouter = require('./routes/clinicianRouter')
//app.use(clinicianRouter)

// send HTTP requests to routers
app.use('/', mainRouter)
//app.use('/patient', patientRouter)
//app.use('/clinician', clinicianRouter)


app.listen(process.env.PORT || 8080, () => {
    console.log('Diabetes@Home is listening...')
})
