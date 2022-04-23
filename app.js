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
    })
)
app.set('view engine', 'hbs')

// connect to database
require('./models/db.js')

//middleware to see all request in terminal
app.use((req,res, next) => {
    console.log("message arrived: " + req.method + " " + req.path)
    next();
})

// Set default page as the aboutWebsite page for now, until we make an actual home page
app.get('/', function (req, res) {
    res.render('home.hbs', { layout: 'main' })
})

// connect to routers
const patientRouter = require('./routes/patientRouter')
const clinicianRouter = require('./routes/clinicianRouter')

// send HTTP requests to routers
app.use('/patient', patientRouter)
app.use('/clinician', clinicianRouter)

app.listen(process.env.PORT || 8080, () => {
    console.log('Diabetes@Home is listening...')
})
