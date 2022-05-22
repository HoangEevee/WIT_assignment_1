// Express
const express = require('express')
const app = express()
app.use(express.static('public')) // define where static assets live

const flash = require('express-flash')
const session = require('express-session')

app.use(express.urlencoded({ extended: false }))

// Handlebars stuff
const exphbs = require('express-handlebars')
app.engine(
    'hbs',
    exphbs.engine({
        extname: 'hbs',
        helpers: {
            outOfThreshold: (value, lower, higher, exists) => {return value < lower || value > higher || (!value && exists)},
            upToDate: (exists, last, today) => {return exists && (last.toLocaleDateString().localeCompare(today) != 0)},
            badgeEarned: (engagement) => {return engagement > 80.00},
            equalTo: (value1, value2) => {return value1 == value2},
            isOdd: (num) => {return num % 2 != 0}
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

// send HTTP requests to routers
app.use('/', mainRouter)


app.listen(process.env.PORT || 8080, () => {
    console.log('Diabetes@Home is listening...')
})
