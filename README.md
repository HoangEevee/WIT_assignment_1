# WIT_assignment
Assignment 1/2/3 for WIT sem1 2022

Notes for assignment submission 3: 

Notes for assignment submission 2: 
1. When a user sign in there is a sign in option for clinician and for patient. In order to see the patient's informaton then click on patient sign in for (pat), and to view clinican dashboard then click on clinician sign in.
2. 'Patient-clinicians-test' DBS collection being used in MongoDB for the purposes of D2. We will seperate this into patient and clinician for D3. 

Assumptions and notes for patient (mobile) and clinical UI (desktop) screens:
Assumptions and notes for assignment 1: 

1. For the 'record health data' screen in the patient UI we have modelled the patient UI so that the patient fills
in all four data requirements including all blood glucose, exercise (step count), insulin doses, and weight. 
2. For the sign in options we have assumed that a new patient (who has alreay created their password) signs in autmomatically as a normal user would with their username (email) and their password. For a new user we have modelled the sign in so that they create a new password by themselves as this addresses the business requirement of "patients manage their own password" - this is how we understood that statement. Hence a new user would then have to create their new password if they are new to the system and go through a verification process which is seen in the other screens. 
3. For the clinical UI screen where the clincial has to monitor important comments from the patient: we have modelled this so that the comment which the paitent sends to the clinician is seen in the direct message screen. In this screen there is a message that says 'step count message' which is a particular message regarding the patients step count. This way the clinical can monitor what the paitent is saying in regards to their exercise, weight, blood glucose, or insulin doses. These 'important' messages are represented with a red notification dot instead of green.
4. For the clinical Ui in order for clinicians to specify which data each patient needs to input, a check-list on the patient page can be ticked or unticked to indicate which data is required. For project 1, it is assumed that patient Margaret Liel needs to input all 4 data. 

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






