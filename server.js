const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to API Moradias." });
});

require("./app/routes/user.routes.js")(app);
require("./app/routes/ticket.routes.js")(app);
require("./app/routes/reserve.routes.js")(app);
require("./app/routes/user_login.routes.js")(app);
require("./app/routes/rent.routes.js")(app);
require("./app/routes/notice.routes.js")(app);
require("./app/routes/doc.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
