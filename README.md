# WIT_assignment
NOTES FOR DELIVERABLE 3; 

GENERAL DELIVERABLE NOTES //
* at least 10 patients, including patient 'pat'
for this dot point we understood that since theres are two clinicians, we had 10 patients for each clinician, including patient pat who is managed by chris 
total patients; 20 
total clinicians; 2 

* at least 2 clinicians, including clinician 'chris' 
for this dot point we have two clinicians; chris and dkt 

* pat is assigned to enter some but not all of the 4 possible time-series. patient pat currently only has blood glucose and exercise set for him by the clinician with comments as well

* pat has an engagement rate of above 80% - this is seen in the acheivements pages, in digital badge and leaderboard pages

* at least 5 comments have been entered by patients - this can be seen within patient comments page in clinician end

OTHER NOTES // 

* we also have some dummy links which do not work as we decided to change the design/concept of the application in certain pages

* we assumed that patient is given a password from their clincian and they use that to sign in - but they can re change their password in their person account page

PATIENT UI // 
- for log in pages; pat can enter username and password 
- for info pages; two about pages should be visible when logged out and logged in 
- for health data entry 1; patient pat has two time series set for him to enter data. 
- for health data entry 2; patient pat can enter a comment attached to the timeseries provided to him by his clinician 
- for health data entry 3; patient pat does not need to enter all information at the same. but once one data entry is submitted he can not go back and re enter
- for view data; patient pat can view his health data once he enteres it from his record health 
- for view support messages; patient pat can see the most current support message from their clinician 
- for engagement badge and leaderboard; patient pat can see the badge for themselves only if they have recieved an engagement rate over 80% or else their badge is shown in an 'unlocked' mode (more dull shaded badge). Since patient pat as per requirements has an engagement rate oer 80% he has an 'unlocked' badge and is seen on the leaderboard
- for change password; patient pat can change his password within his personal account/details page

CLINCIAN UI // 
- for dashboard; table is seen with patients health details, including what information is missing (represented by ???), what information is above threshold (represented in red font)
- for today's data; patient pat's absent information and numbers outside of threshold can be seen
- for manage patients 1; clicking on a patients name takes the clinician to the patients account, including pat's
- for manage patients 2; clinician is able to change the timeseries for pat whenever the prefer
- for manage patients 3; clinician is able to change the threshold (upper and lower bound) of patient pat
- for support messages; clinician can update the current support message and send that to patients 
- for view data; clinician can view patient pat's historical health data 
- for clinical notes; clinician is able to take notes regarding patient pat's health 
- for view patient comments; clinician has a page in the side nagivation bar to view a list of recent patient comments
- for register patient; clinician can register/add a new patient to the database (dbs). 

IMPLEMENTED BONUS FEATURE //
- we have incorporated a dark mode within the personal details pages of patient and clinician






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






