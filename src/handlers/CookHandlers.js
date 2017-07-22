var STATES = require('../util/state');
var FRIDGE = require('../util/fridge');

var COOK_WELCOME_MESSAGE = "Welcome to the kitchen.";
var COOK_REPROMPT_MESSAGE = "Would you like me to suggest something to cook?";

var RecipeStateHandlers = {
    "Cook": function() {
        this.emit(":ask", COOK_WELCOME_MESSAGE, COOK_REPROMPT_MESSAGE);
    },
    "FridgeIntent": function() {
        this.handler.state = STATES.FRIDGE_STATE;
        this.emitWithState("Fridge");
    },
    'WhatShouldIMakeIntent': function () {
        // Get items from fridge
        var possibleIngredients = FRIDGE.getItemsInFridge();
        // Pick random recipe based on ingredients
        // Have Alexa echo recipe name
    },
    "AMAZON.StopIntent": function() {
        this.emit(":tell", EXIT_MESSAGE);
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":tell", EXIT_MESSAGE);
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.emitWithState("Cook");
    }
};

module.exports = RecipeStateHandlers;
