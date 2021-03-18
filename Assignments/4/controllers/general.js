const express = require('express');
const router = express.Router();
const foodItemsModule = require("../models/foodItemsLists");

router.get("/", function(req, res){
 
    res.render("general/index", {
      foodInfo: foodItemsModule.getTopMeal()
    });
});

router.get("/onTheMenu", function(req, res){
  res.render("../views/general/onTheMenu", {
    classic: foodItemsModule.getClassic(),
    starter: foodItemsModule.getStarter()
  });
});

router.get("/registration", function(req, res){
  res.render("general/registration");
});

router.post("/welcome", function(req, res){

  //res.render("general/welcome");
  //name: res.fname;
  //res.send(req.body);
  const { fname, lname, email, password } = req.body;

  let validationResults = {};
  let passedValidation = true;

  var emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; //SRC:- https://stackoverflow.com/questions/940577/javascript-regular-expression-email-validation
  var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/; //SRC:- https://www.w3resource.com/javascript/form/password-validation.php

  if(typeof fname !== "string" || fname.length === 0)
  {
    validationResults.fname = "You must specify a first name."
    passedValidation = false;
  }
  else if (fname.length < 2) 
  {
      validationResults.fname = "The first name must be at least 2 characters.";
      passedValidation = false;
  }

  if (typeof lname !== "string" || lname.length === 0) 
  {
    validationResults.lname = "You must specify a first name."
    passedValidation = false;
  }
  else if (lname.length < 2) 
  {
      validationResults.lname = "The last name must be at least 2 characters.";
      passedValidation = false;
  }

  if(typeof email !== "string" || email.length === 0 || (!email.match(emailPattern)))
  {
    validationResults.email = "Enter correct email address.";
    passedValidation = false;
  }

  if(!password.match(passwordPattern))
  {
    validationResults.password = "Password length must have special characters.";
    passedValidation = false;
  }
  else if(password.length < 8)
  {
    validationResults.password = "Password length must be atleast 8 characters.";
    passedValidation = false;
  }

  if(passedValidation)
  {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

    const msg = {
        to: email,
        from: "dverma22@myseneca.ca",
        subject: "Contact Us Form Submission",
        html:
            `Welcome to Desi Khana ${fname} ${lname}<br>
            My name is Davinder Verma and you have visited Desi Khana`
    };

    // Asyncronously sends the email message.
    sgMail.send(msg)
        .then(() => {
            res.redirect("/welcome");
        })
        .catch(err => {
            console.log(`Error ${err}`);
            res.send(`CANT SEND EMAIL:- ${err}`);
        });  }
  else
  {
    res.render("general/registration", {
      validationResults: validationResults,
      values: req.body

    });
  }

});

router.get("/welcome", function(req, res){
  res.render("general/welcome");
});

router.get("/login", function(req, res){
  res.render("general/login");
});

router.post("/login", function(req, res){

  const { email, password } = req.body;

  let validationResults = {};
  let passedValidation = true;

  if(typeof email !== "string" || email.length === 0)
  {
    validationResults.email = "Enter correct email address.";
    passedValidation = false;
  }

  if(typeof password !== "string" || password.length === 0)
  {
    validationResults.password = "Enter correct Password.";
    passedValidation = false;
  }

  if(passedValidation)
  {
    res.send("congo");
  }
  else
  {
    res.render("general/login", {
      validationResults: validationResults,
      values: req.body
    });
  }

});


module.exports = router;