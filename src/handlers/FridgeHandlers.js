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
    'StartCookingIntent': function () {
        this.handler.state = STATES.RECIPE_STATE;
        this.emit('DefaultRecipeIntent');
    },
    'Unhandled': function () {
        //this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
    }
});

module.exports = FridgeStateHandlers;
