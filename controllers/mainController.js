const getMainPage = (req, res, next) => {
    try{
        res.render("homePage", {layout: "main"})
    } catch (err){
        next(err)
    }
}

const getAboutDiabetes = (req, res, next) => {
    try{
        res.render('aboutDiabetes', {layout: 'main'})
    } catch (err) {
        next(err)
    }
}

const getAboutWebsite = (req, res, next) => {
    try{
        res.render('aboutWebsite', {layout: 'main'})
    } catch (err) {
        next(err)
    }
}

const getSignin = (req, res, next) => {
    try{
        res.render("signInPage", {flash: req.flash('error'), layout:"main"})
    } catch (err) {
        next(err)
    }
}

const getLogout = (req, res, next) => {
    try{
        req.logout()
        res.redirect('/')
    } catch (err) {
        next(err)
    }
}


module.exports = {
    getMainPage,
    getAboutDiabetes,
    getAboutWebsite,
    getSignin,
    getLogout
}