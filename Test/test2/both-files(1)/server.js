// *** Fill in your information ***
// Full Name:Davinder Verma
// Student #:121802201
// Seneca Email:dverma22@myseneca.ca
// Class: WEB322 NAA
// ********************************

// You may refer to the Node.js online documentation, Express online documentation,
// web322.ca website, and the course notes when answering this question.

var path = require("path");
var express = require("express");
var app = express();

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

// ******** DO NOT CHANGE ANYTHING ABOVE THIS LINE (EXCEPT THE HEADER) ********


// *** PART A - 3 Marks ***
// Using the "path" module, create a "GET" route at the default url '/'
// (eg. http://localhost/) and send the file "home.html" located at
// the root of your application folder.
// (HINT: do not forget to include __dirname in your solution)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/home.html"));
});


// *** PART B - 3 Marks ***
// Create a "GET" route "/employee-list" and return a JSON formatted string: {message:"all employees"}.
// Additionally, this route will support optional queries:
//      • "/employee-list?department=Sales" which returns a JSON formatted string: {message:"Sales"} 
//      • "/employee-list?company=Amazon" which returns a JSON formatted string: {message:"Amazon" }
// (HINT: your response will return a JSON literal object using res.json(...))
app.get("/employee-list", (req, res) => {
    res.json("all employees");
});

app.get("/employee-list?department=Sales", (req, res) => {
    res.json("Sales");
});

app.get("/employee-list?company=Amazon", (req, res) => {
    res.json("Amazon");
});


// *** PART C - 2 Marks ***
// Create a "GET" route "/employee/<employee ID>" and return a JSON formatted string:
//      {message: employeeID}
// where employeeID is the value, e.g. 123456789, passed in the url.
var employeeID;
app.get("/employee/" + employeeID, (req, res) => {
    res.send(employeeID);
});


// *** PART D - 3 Marks ***
// Create a "route" that is invoked if no other paths are matched.  Ensure that
// a 404 status code and the plain text message "Page Not Found" are sent back.
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});


// ******** DO NOT CHANGE ANYTHING BELOW THIS LINE ********

app.listen(HTTP_PORT, onHttpStart);