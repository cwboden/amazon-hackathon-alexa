var STATES = require('../util/state');
var FRIDGE = require('../util/fridge');

var FRIDGE_WELCOME_MESSAGE = "Welcome to the fridge.";
var FRIDGE_REPROMPT_MESSAGE = "Would you like to add an item, remove an item, or hear all items?";

var FridgeStateHandlers = {
    "Fridge": function() {
        this.emit(":ask", FRIDGE_WELCOME_MESSAGE, FRIDGE_REPROMPT_MESSAGE);
    },
    "CookIntent": function() {
        this.handler.state = STATES.COOK_STATE;
        this.emitWithState("Cook");
    },
    'GetWhatsInMyFridgeIntent': function () {
        // Get ingredients from fridge
        var allItems = this.attributes['fridgeList'];
        // Have Alexa echo out each ingredient
        var i = 0;
        var itemsStr = allItems.length == 0 ? "nothing" : "";
        for (; i < allItems.length - 1; i++) {
            itemsStr += allItems[i] + ", ";
        }
        if (allItems.length >= 1) {
            itemsStr += allItems.length == 1 ? allItems[0] : "and " + allItems[i];
        }

        this.emit(":tell", "In your fridge, you currently have " + itemsStr);
    },
    'AddToMyFridgeIntent': function () {
        // Get item to add to fridge
        var ingredient = this.event.request.intent.slots.Ingredients.value;
        if(this.attributes['fridgeList'] === undefined) this.attributes['fridgeList'] = [];
        var fridgeList = this.attributes['fridgeList'];
        console.log(ingredient);

        // Check for existing item
        if (fridgeList.indexOf(ingredient) > -1) {
            this.emit(":tell", "You already have " + ingredient + " in your fridge.");
        }
        else {
            // Add to fridge list
            fridgeList.push(ingredient);
            this.emit(":tell", "Added " + ingredient + " to your fridge.");
        }
    },
    'RemoveFromMyFridgeIntent': function () {
        // Gather items to remove
        var ingredient = this.event.request.intent.slots.Ingredients.value;
        console.log(ingredient);
        // Remove from fridge object
        if(this.attributes['fridgeList'] === undefined) this.attributes['fridgeList'] = [];
        var fridgeList = this.attributes['fridgeList'];
        var index = fridgeList.indexOf(ingredient);
        if (index > -1) {
            fridgeList.splice(index, 1);
            this.emit(":tell", "Removed " + ingredient + " from your fridge.");
        }
        else {
            this.emit(":tell", "You don't have " + ingredient + " in your fridge.");
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
