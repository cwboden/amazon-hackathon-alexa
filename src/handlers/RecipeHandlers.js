var Alexa = require('alexa-sdk');
var STATES = require('../util/state');
var FRIDGE = require('../util/fridge');

var RecipeStateHandlers = Alexa.CreateStateHandler(STATES.RECIPE_STATE, {
    'DefaultRecipeIntent': function () {
        this.emit(":ask", "Let's get cooking.", "Should I pick a random recipe for you?");
    },
    'WhatShouldIMakeIntent': function () {
        // Get items from fridge
        var possibleIngredients = FRIDGE.getItemsInFridge();
        // Pick random recipe based on ingredients
        // Have Alexa echo recipe name
    },
    'OpenMyFridgeIntent': function () {
        this.handler.state = STATES.FRIDGE_STATE;
        this.emitWithState('DefaultFridgeIntent');
    },
    'Unhandled': function () {
        //this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
    }
});

module.exports = RecipeStateHandlers;
