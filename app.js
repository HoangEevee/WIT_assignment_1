// Express
const express = require('express')
const app = express()
const patientRouter = require('./routes/patientRouter')
app.use(express.urlencoded({ extended: true })) // replaces body-parser
app.use(express.static('public'))	// define where static assets live

// Handlebars stuff
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs.engine({
	defaultlayout: 'main',
	extname: 'hbs'
}))
app.set('view engine', 'hbs')

// Set default page as the aboutWebsite page for now, until we make an actual home page
app.get('/', function(req, res) {
    res.render('recordHealth');
});

app.use('/patient', patientRouter)

// to add heroku here i think?
app.listen(8080, () => {
    console.log('Diabetes@Home is listening...')
});