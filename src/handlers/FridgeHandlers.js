var STATES = require('../util/state');

var FridgeStateHandlers = Alexa.CreateStateHandler(STATES.FRIDGE_STATE, {
    'GetWhatsInMyFridgeIntent': function () {
        // Get ingredients from fridge
        // Have Alexa echo out each ingredient
    },
    'AddToMyFridgeIntent': function () {
        // Gather items to add to fridge
        // Append to fridge object
    },
    'RemoveFromMyFridgeIntent': function () {
        // Gather items to remove
        // Remove from fridge object
    },
    'Unhandled': function () {
        //this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
    }
});

module.exports = FridgeStateHandlers;