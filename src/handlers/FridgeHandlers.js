var Alexa = require('alexa-sdk');
var STATES = require('../util/state');
var FRIDGE = require('../util/fridge');

var FridgeStateHandlers = Alexa.CreateStateHandler(STATES.FRIDGE_STATE, {
    'DefaultFridgeIntent': function () {
        this.emit(":ask", "Your fridge is open.", "Would you like to add, remove, or list the items in your fridge?");
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
        // Append to fridge object
    },
    'RemoveFromMyFridgeIntent': function () {
        // Gather items to remove
        // Remove from fridge object
    },
    'StartCookingIntent': function () {
        this.handler.state = STATES.RECIPE_STATE;
        this.emit('DefaultRecipeIntent');
    },
    'Unhandled': function () {
        //this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
    }
});

module.exports = FridgeStateHandlers;
