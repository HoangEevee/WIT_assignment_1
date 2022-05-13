/**
 * All routes shall be imported here, then exported to app.js
 */

/**
const express = require("express");
var indexRouter = require("../routes/index");
var router1Router = require("../routes/router1");
var router2Router = require("../routes/router2");

module.exports = function(app) {
  app.use(express.json());

  app.use("/", indexRouter);
  app.use("/router1", router1Router);
  app.use("/router2", router2Router);
};
///
And App.js I only import startup/routes.js like this:
///
const express = require("express");
const app = express();

require("./startup/routes")(app);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
///
In this way, when we want to add another route to our app, we add it to the startup/routes.js, 
without needing to make change to the App.js file, which keeps our App.js clean and short.

You can also add other files (for example database connect) to the startup folder later when required, 
and import them to the App.js. 
https://stackoverflow.com/questions/59681974/how-to-organize-routes-in-nodejs-express-app
https://www.reddit.com/r/node/comments/bol0fq/how_can_i_organize_my_express_router_routes_better/

https://www.codecademy.com/courses/learn-express/lessons/router-parameters/exercises/merge-params
https://www.reddit.com/r/node/comments/a49ti2/express_sharing_context_between_controllers_and/
https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router
https://listentoripley.medium.com/express-js-routing-with-nested-paths-2526bae9d2e6

 */