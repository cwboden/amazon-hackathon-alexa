var Alexa = require('alexa-sdk');
var STATES = require('../util/state');
var FRIDGE = require('../util/fridge');

var FridgeStateHandlers = {
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
}

module.exports = FridgeStateHandlers;
