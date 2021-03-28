const express = require('express');
const bcrypt = require("bcryptjs");
const path = require("path");
const NameModel = require('../models/registration');
const mongoose = require("mongoose");

//const NameModel = require('../models/registration');
const router = express.Router();

//Connect to MongoDB
mongoose.connect("mongodb+srv://davinderverma:Sydney@2021@web322.v53z3.mongodb.net/web322MealKits?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}
);

router.get("/", function(req, res){
    res.render("general/login");
  });
  
  router.post("/", function(req, res){
    
      /*const { email, password, customer, clerk } = req.body;*/
  
    //let validationResults = {};
    let passedValidation = true;
  
   /* if(typeof login.email !== "string" || email.length === 0)
    {
      validationResults.email = "Enter correct email address.";
      passedValidation = false;
    }
  
    if(typeof password !== "string" || password.length === 0)
    {
      validationResults.password = "Enter correct Password.";
      passedValidation = false;
    }*/
  
    if(passedValidation)
    {
      let errors = [];

      // Search MongoDB for a document with the matching email address.
      NameModel.findOne({
          email: req.body.email
      })
      .then((user) => {
          if (user) {
              // User was found, compare the password in the database
              // with the password submitted by the user.
              bcrypt.compare(req.body.password, user.password)
              .then((isMatched) => {
                  if (isMatched) {
                      // Password is matched.
  
                      // Create a new session and set the user to the
                      // "user" object returned from the DB.
                     req.session.user = user;
  
                      res.redirect("/");
                  }
                  else {
                      // Password does not match.
                      errors.push("Sorry, your password does not match our database.")
  
                      res.render("general/login", {
                          errors
                      });
                  }
              })
              .catch((err) => {
                  // bcrypt failed for some reason.
                  console.log(`Error comparing passwords: ${err},`);
                  errors.push("Oops, something went wrong.");
          
                  res.render("general/login", {
                      errors
                  });
              });
          }
          else {
              // User was not found in the database.
              errors.push("Sorry, your email was not found.")
  
              res.render("general/login", {
                  errors
              });
          }
      })
      .catch((err) => {
          // Couldn't query the database.
          console.log(`Error finding the user from the database: ${err},`);
          errors.push("Oops, something went wrong.");
  
          res.render("general/login", {
              errors
          });
      }); 
    }
    else
    {
      res.render("general/login", {
        validationResults: validationResults,
        values: req.body
      });
    }
  
  });


  // Set up logout page
  router.get("/logout", (req, res) => {
    // Clear the session from memory.
    req.session.destroy();
    
    res.redirect("/general/login");
  });
  



  module.exports = router;  