const express = require('express');
var path = require("path");


const app = express();


// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req, res){
    res.send("Hello World!!!");
});

var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);