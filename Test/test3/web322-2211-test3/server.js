// *** Fill in your information ***
// *** 1 Mark (all headers filled correctly)
// Full Name: Davinder Verma
// Student #: 121802201
// Seneca Email: dverma22@myseneca.ca
// Class: WEB322 NDD
// ********************************

// You may refer to the Node.js online documentation, Express online documentation,
// HandleBars documentation, web322.ca website, and the course notes when answering
// this question.

// Don't forget to install the node modules before you begin working on your solution.
// The package.json file was already included so you can simply type the terminal command:
//      npm install

const path = require("path");
const express = require("express");
const exphbs = require('express-handlebars');

// Initialize express with handlebars.
const app = express();

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: ''
}));

app.set('view engine', '.hbs');

// ******** DO NOT CHANGE ANYTHING ABOVE THIS LINE (EXCEPT THE HEADER) ********



// ****** QUESTION #1 - 10 MARKS ******

// *** PART 1A - 2 Marks ***
// Create a "GET" route at the default url "/" (eg. http://localhost/)
// and send the handlebars view "home.hbs".  You must pass the array
// to the view.  You will use this array for part 1B.
app.get("/", function(req,res){
    let dataToShow = [
        { employeeId: 321, fullName: "Cameron Gray", isManager: false },
        { employeeId: 654, fullName: "Kathy Dumanski", isManager: true },
        { employeeId: 987, fullName: "Nick Romanidis", isManager: false }
    ];
	
	// Insert code here
    res.render("home",{
        data : dataToShow
    });

});

// *** PART 1B - 8 Marks ***
// Modify the HandleBars view called "home.hbs".  In the view file you
// will design a table to list employees working at Seneca College.  The
// view file has already been started but you must fill in the blanks.
// An example of the view is available in the file "home-page-example.png"
// located in the root folder.


// ****** QUESTION #2 - 17 Marks ******

// *** PART 2A - 1 Mark ***
// Set up the form processing middleware to allow express
// the ability to parse the body of a form post.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


// *** PART 2B - 10 Marks ***
// Modify the HandleBars view called "addStudent.hbs".  In the view file you
// will design a form to add students to a program at Seneca College.  The
// view file has already been started but you must fill in the blanks.
// An example of the form is available in the file "add-student-form-example.png"
// located in the root folder.



// *** PART 2C - 1 Mark ***
// Create a "GET" route at the url "/addStudent" (eg. http://localhost/addStudent)
// and send the handlebars view "addStudent.hbs".
app.get("/addStudent", function(req,res){
    res.render("addStudent");
});

// *** PART 2D - 5 Marks ***
// Create a "POST" route at the url "/addStudent" and return a JSON formatted string.
// The response will differ if the fullName field is valid or not.
// (HINT: your response will return a JSON literal object using res.json(...))
app.post("/addStudent", (req, res) => {

    const { fullName, studentNum, program } = req.body;

    let passedValidation = true;


    // *** 2 Marks ***
    // Validate the fullName field.  Make sure it:
    //      - has been specified (in otherwords, it is not an empty string)
    //      - it has a minimum length of 2 characters.

    if (typeof fullName !== "string" || fullName.length === 0) {
        passedValidation = false;
    }
    else if (fullName.length < 2) {
        passedValidation = false;
    }



    // *** 1 Mark ***
    // If the fullName field is *not* valid, return the JSON literal:
    //      {message:"Full name is not valid."}
    // Note: You do not need to specify what validation failed
if(passedValidation == false)
{
    res.send("Full name is not valid.")
}


    // *** 2 Marks ***
    // If the posted data is *valid*, return the JSON literal:
    //      {message:"Student <fullName> (<studentNum>) added to the <program> program."}.
    // Note: <fullName>, <studentNum> and <program> represent the values entered by the user.

    if(passedValidation == true)
{
    res.send("Student " + res.body.fullName + " " + res.body.studentNum + " added to " + res.body.program);
}

});



// ******** DO NOT CHANGE ANYTHING BELOW THIS LINE ********

// A "route" that is invoked if no other paths are matched.
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.listen(HTTP_PORT, onHttpStart);