# WIT_assignment
Assignment 1/2/3 for WIT sem1 2022

Notes for Deliverable 3: 
-


List of (get) routes right now:
/                                   # main landing
/aboutWebiste
/aboutDiabetes
/whoAreYou                          # choose who they are
/patient                            # login page
        /home
        /aboutWebiste
        /aboutDiabetes
        /yourAccount
        /past-health
        /user
        /record-health-form
/clinician
        /dashboard
        /create-new-account
        /create-patient-account
        /:id                        # patient account info?
                /set-timeseries

List of (get) routes (proposed by Quynh)
/                                   # main landing
/about-webiste
/about-diabetes
/who-are-you                        # choose who they are
/patient                            # login page
        /home
        /about-webiste
        /about-diabetes
        /account
                /past-health
                /account-info       # can change account info here (incl. changing pwd)
                /record-health-form
        /achievements               # the trophy symbol :))) (achievements page in adobexd)
                /leaderboard        # ADD TO MENU/NAV???
                /badges             # ADD TO MENU/NAV???
        /support-messages           # list of support msgs :) - NOTE: add the red mark "you've got new msg" thing on the icon
        /settings                   # optional when we have time - custom colours
/clinician                          # login OR asks "new or existing?" // prolly too much work - we can just make 2 acc already
        /dashboard
        /all-comments
        /create-patient-account
        /:id                        # patient account info, like display general things, let sub routes change values
                /past-health
                /set-timeseries
                /support-messages
                /patient-info
        /current-user-login         # if "new OR exisitng" implemented
        /create-new-account         # if "new OR exisitng" implemented

So the routers will be
mainRouter.js               |   mainController.js               # for /

patientRouter.js            |   patientController.js            # for /patient/
patientAccountRouter.js     |   patientAccountController.js     # for /patient/account
achievementRouter.js        |   achievementController.js        # for /patient/achievements

clinicianRouter.js          |   clinicianController.js          # for /clinician/
managePatientRouter.js      |   managePatientController.js      # for /clinician/:id

Shared logics will be in a helper function file






