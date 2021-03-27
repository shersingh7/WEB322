const express = require('express');
//const bcrypt = require("bcryptjs");
const path = require("path");
const userModel = require('../models/login');
const mongoose = require("mongoose");

//const userModel = require('../models/registration');
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