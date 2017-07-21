var Alexa = require('alexa-sdk');
var STATES = require('../util/state');
var FRIDGE = require('../util/fridge')

var StartHandlers = Alexa.CreateStateHandler(STATES.START, {
    'OpenMyFridgeIntent': function () {
        this.handler.state = STATES.FRIDGE_STATE;
    },
    'StartCookingIntent': function () {
        this.handler.state = STATES.RECIPE_STATE;
    },
    'Unhandled': function () {
        //this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
    }

});

function suggestRecipe() {
    this.handler.currentRecipe = getRandomRecipe();

    this.emit(':tell', "Would you like to make " + this.handler.currentRecipe.recipes.title);
}

module.exports = StartHandlers;
