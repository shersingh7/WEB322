const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealKit = new Schema({

    title: 
    {
        type: String,
        required: true,
        unique: true
    },
    wIncluded:
    {
        type: String,
        required: true
    },
    desc: 
    {
        type: String,
        required: true
    },
    category:
    {
        type: String,
        required: true
    },
    price: 
    {
        type: Number,
        required: true
    },
    cTime: 
    {
        type: Number,
        required: true
    },
    servings:
    {
        type: Number,
        required: true
    },
    calories:
    {
        type: Number,
        required: true
    },
    topMeal:
    {
        type: Boolean,
        required: true
    },
    mealPhoto:
    {
        type: String,
        required: true
    }

});


const mealModel = mongoose.model("Meals", mealKit);

module.exports = mealModel;