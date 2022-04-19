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
        defaultlayout: 'main',
        extname: 'hbs',
    })
)
app.set('view engine', 'hbs')

// connect to database
require('./models/index.js')


// Set default page as the aboutWebsite page for now, until we make an actual home page
app.get('/', function (req, res) {
    res.render('home.hbs')
})

// connect to router
const patientRouter = require('./routes/patientRouter')

// send HTTP requests to router
app.use('/patient', patientRouter)

app.listen(process.env.PORT || 8080, () => {
    console.log('Diabetes@Home is listening...')
})
