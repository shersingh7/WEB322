// *** Fill in your information ***
// Full Name: Davinder Verma
// Student #: 121802201
// Seneca Email: dverma22
// Class: WEB322 NAA
// ********************************


// *** 1 Mark ***
// Declare a (private) variable named "privateCounter" and
// initialize it to zero (0).  This variable will store a non-negative integer.
let privateCounter = 0;

// *** 2.5 Marks ***
// Define and export the function: increase(num).
// This function adds the value of "num" to the variable "privateCounter".
module.exports.increase = function(num)
{
    privateCounter += num;
}

// *** 3 marks ***
// Define and export the function: decrease(num).
// This function decreases the variable privateCounter with the value of "num".
// If "privateCounter" results in a negative number, it must be set to zero.
module.exports.decrease = function (num)
{
    privateCounter -= num;

    if(privateCounter < 0)
    {
        privateCounter = 0;
    }
}

// *** 2.5 Marks ***
// Define and export the function: value().
// This function will return the value of "privateCounter".
module.exports.value = function()
{
    return privateCounter;
} 