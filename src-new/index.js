'use strict';
const Alexa = require('alexa-sdk');

var APP_ID = 'amzn1.ask.skill.85ae7ea2-b727-4d2a-9765-5c563a5ec379';

var WELCOME_MESSAGE = "Welcome to Snack Overflow!";
var HELP_MESSAGE = "Do you want to see your fridge or start cooking?";
var EXIT_MESSAGE = "Goodbye!";

var FRIDGE_WELCOME_MESSAGE = "Welcome to the fridge!";
var FRIDGE_HELP_MESSAGE = "What would you like to do?"

var states = {
    START: "_START",
    FRIDGE: "_FRIDGE",
    COOK: "_COOK"
};

const handlers = {
    "LaunchRequest": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
    },
    "FridgeIntent": function() {
        this.handler.state = states.FRIDGE;
        this.emitWithState("Fridge");
    },
    "CookIntent": function() {
        this.handler.state = states.COOK;
        this.emitWithState("Cook");
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", WELCOME_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
    }
};

var startHandlers = Alexa.CreateStateHandler(states.START, {
    "Start": function() {
        this.emit(":ask", WELCOME_MESSAGE, HELP_MESSAGE);
    },
    "FridgeIntent": function() {
        this.handler.state = states.FRIDGE;
        this.emitWithState("Fridge");
    },
    "CookIntent": function() {
        this.handler.state = states.COOK;
        this.emitWithState("Cook");
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
        this.emitWithState("Start");
    }
});

var fridgeHandlers = Alexa.CreateStateHandler(states.FRIDGE, {
    "Fridge": function() {
        this.emit(":ask", FRIDGE_WELCOME_MESSAGE, FRIDGE_HELP_MESSAGE);
    },
    "CookIntent": function() {
        this.handler.state = states.COOK;
        this.emitWithState("Cook");
    },
    'GetWhatsInMyFridgeIntent': function () {
        // Get ingredients from fridge
        var allItems = FRIDGE.getItemsInFridge();
        // Have Alexa echo out each ingredient
        var i = 0;
        var itemsStr = allItems.length == 0 ? "nothing" : "";
        for (; i < allItems.length - 1; i++) {
            itemsStr += allItems[i] + ", ";
        }
        if (allItems.length >= 1) {
            itemsStr += allItems.length == 1 ? allItems[0] : "and " + allItems[i];
        }

        this.echo(":tell", "In your fridge, you currently have " + itemsStr);
    },
    'AddToMyFridgeIntent': function () {
        // Gather items to add to fridge
        var ingredients = this.event.request.intent.slots.Ingredients.value.split(" ");
        console.log(ingredients);
        // Append to fridge object
        for (var i = 0; i < ingredients.length; i++) {
            FRIDGE.addItemToFridge(ingredient);
        }
    },
    'RemoveFromMyFridgeIntent': function () {
        // Gather items to remove
        var ingredients = this.event.request.intent.slots.Ingredients.value.split(" ");
        console.log(ingredients);
        // Remove from fridge object
        for (var i = 0; i < ingredients.length; i++) {
            FRIDGE.removeItemFromFridge(ingredient);
        }
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
        this.emitWithState("Fridge");
    }
});

var cookHandlers = Alexa.CreateStateHandler(states.COOK, {
    "Cook": function() {
        this.emit(":ask", COOK_WELCOME_MESSAGE, COOK_HELP_MESSAGE);
    },
    "FridgeIntent": function() {
        this.handler.state = states.FRIDGE;
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
});

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appID = APP_ID;
    alexa.registerHandlers(handlers, startHandlers, fridgeHandlers, cookHandlers);
    alexa.execute();
}
