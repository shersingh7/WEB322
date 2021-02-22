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

router.get("/login", function(req, res){
  res.render("general/login");
});

module.exports = router;