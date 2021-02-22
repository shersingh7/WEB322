/************************************************************************************
* WEB322 – Assignment 1 (Winter 2021)
* I declare that this assignment is my own work in accordance with Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Name: Davinder Verma
* Student ID: 121802201
* Course: WEB322-NDD
*
************************************************************************************/

const express = require('express');
const path = require("path");
const app = express();

app.use(express.static("static"));


app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/views/html/index.html"));
});

app.get("/onTheMenu", function(req, res){
  res.sendFile(path.join(__dirname, "/views/html/onTheMenu.html"));
});

app.get("/registration", function(req, res){
  res.sendFile(path.join(__dirname, "/views/html/registration.html"));
});

app.get("/login", function(req, res){
  res.sendFile(path.join(__dirname, "/views/html/login.html"));
});

var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);