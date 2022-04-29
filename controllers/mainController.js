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
        res.render("whoAreYou", {layout:"main"})
    } catch (err) {
        next(err)
    }
}
module.exports = {
    getMainPage,
    getAboutDiabetes,
    getAboutWebsite,
    getSignin,
}