const express = require('express');
const bcrypt = require("bcryptjs");
const path = require("path");
const dataModel = require('../models/loadData');
const router = express.Router();

    router.get("/", (req, res) => {
    res.render("general/clerk");
    });

router.post("/", (req, res) => {
    const data = new dataModel({
        title: req.body.title,
        wIncluded: req.body.wIncluded,
        desc: req.body.desc,
        category: req.body.category,
        price: req.body.price,
        cTime: req.body.cTime,
        servings: req.body.servings,
        calories: req.body.calories,
        topMeal: req.body.topMeal,
        mealPhoto: req.body.mealPhoto
    });

        // Search MongoDB for a document with the matching email address.
        dataModel.findOne({
            title: req.body.title,
        })
        .then((meal) => {
            if (meal) {
                // User was found, compare the password in the database
                // with the password submitted by the user.
                bcrypt.compare(req.body.title, meal.title)
                .then((isMatched) => {
                    if (isMatched) {
                        // Password is matched.
    
                        // Create a new session and set the user to the
                        // "user" object returned from the DB.
                        errors.push("Oops, the meal already exits in database!!!");

                    }
                })
                .catch((err) => {
                    // bcrypt failed for some reason.
                    console.log(`Error comparing title: ${err},`);
                    errors.push("Oops, something went wrong.");
            
                    res.render("general/clerk", {
                        errors
                    });
                });
            }
        })
        .catch((err) => {
            // Couldn't query the database.
            console.log(`Error finding the meal from the database: ${err},`);
            errors.push("Oops, something went wrong.");
    
            res.render("general/clerk", {
                errors
            });
        });
        
        data.save()
        .then((mealSaved) => {
        // User was saved correctly.
        console.log(`Meal kit ${mealSaved.title} has been saved to the database.`);

        // Rename the file name so that it is unique on our system.
        req.files.mealPhoto.name = `pro_pic_${mealSaved._id}${path.parse(req.files.mealPhoto.name).ext}`;

        // Copy the image data to a file in the "public/uploads" folder.
        req.files.mealPhoto.mv(`public/uploads/${req.files.mealPhoto.name}`)
        .then(() => {

            // Update the user document so that it contains the name of the image
            // file we saved. Do this as a second step the file could not be saved
            // correctly.
            dataModel.updateOne({
                _id: mealSaved._id
            }, {
                mealPhoto: req.files.mealPhoto.name
            })
            .then(() => {
                console.log("meal kit was updated with the meal pic file name.")
                res.redirect("/");
            })
            .catch((err) => {
                console.log(`Error updating the adding photo.  ${err}`);
                res.redirect("/");
            });
        });
    })
    .catch((err) => {
        console.log(`Error adding meal to the database.  ${err}`);

        res.redirect("/");
    });
});

module.exports = router;  

