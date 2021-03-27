const express = require('express');
const path = require("path");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config({path:"./config/keys.env"});

const app = express();

app.set('view engine', '.hbs');

// Set up body parser
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/static"));

const generalController = require("./controllers/general");
const registrationController = require("./controllers/registration");
const loginController = require("./controllers/login");

app.use("/", generalController);
app.use("/registration", registrationController);
app.use("/login", loginController);

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main'
}));

var HTTP_PORT = process.env.PORT;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);

