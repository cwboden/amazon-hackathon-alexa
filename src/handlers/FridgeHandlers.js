var Alexa = require('alexa-sdk');
var STATES = require('../util/state');
var FRIDGE = require('../util/fridge');

var FridgeStateHandlers = {
    "Fridge": function() {
        this.emit(":ask", "Welcome to the fridge.", "What would you like to do?");
    },
    "CookIntent": function() {
        this.handler.state = states.COOK_STATE;
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
        var ingredient = this.event.request.intent.slots.Ingredients.value;
        console.log(ingredient);
        // Append to fridge object
        if (!this.attributes['fridgeList']) this.attributes['fridgeList'] = [];
        this.attributes['fridgeList'].push(ingredient);
        this.echo(":tell", "Added " + ingredient + " to your fridge.");
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
}

module.exports = FridgeStateHandlers;
