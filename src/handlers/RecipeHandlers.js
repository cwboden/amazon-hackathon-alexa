var STATES = require('../util/state');

var RecipeStateHandlers = Alexa.CreateStateHandler(STATES.RECIPE_STATE, {
    'WhatCanIMakeIntent': function () {
        // Get items from fridge
        // Pick random recipe based on ingredients
        // Have Alexa echo recipe name
    },
    'Unhandled': function () {
        //this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
    }
});

module.exports = RecipeStateHandlers;