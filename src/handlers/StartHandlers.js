var Alexa = require('alexa-sdk');
var FRIDGE = require('../util/fridge')
var STATES = require('../util/state')

var StartHandlers = {
    'OpenMyFridgeIntent': function () {
        this.handler.state = STATES.FRIDGE_STATE;
        this.emitWithState('DefaultFridgeIntent');
    },
    'StartCookingIntent': function () {
        this.handler.state = STATES.RECIPE_STATE;
        this.emitWithState('DefaultRecipeIntent');
    },
    'Unhandled': function () {
        //this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
    }

}

function suggestRecipe() {
    this.handler.currentRecipe = getRandomRecipe();

    this.emit(':tell', "Would you like to make " + this.handler.currentRecipe.recipes.title);
}

module.exports = StartHandlers;
