var Alexa = require('alexa-sdk');
var STATES = require('../util/state');
var FRIDGE = require('../util/fridge');

var RecipeStateHandlers = {
    "Cook": function() {
        this.emit(":ask", "Welcome to cooking.", "What would you like to do?");
    },
    "FridgeIntent": function() {
        this.handler.state = states.FRIDGE_STATE;
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
