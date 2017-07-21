var Alexa = require('alexa-sdk');
var FRIDGE = require('../util/fridge')
var STATES = require('../util/state')

var newSessionHandlers = {
    // This will short-cut any incoming intent or launch requests and route them to this handler.
    'NewSession': function () {
        if (Object.keys(this.attributes).length === 0) { // Check if it's the first time the skill has been invoked
            /*
            // can init attributes here
            this.attributes['endedSessionCount'] = 0;
            this.attributes['gamesPlayed'] = 0;
            */
        }
        this.handler.state = STATES.START;
        this.emit(':ask', 'Welcome to Snack Overflow. You look great today!',
            'Would you like to open your fridge, start cooking, or quit?');
    }
};

var StartHandlers = Alexa.CreateStateHandler(STATES.START, {
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

});

function suggestRecipe() {
    this.handler.currentRecipe = getRandomRecipe();

    this.emit(':tell', "Would you like to make " + this.handler.currentRecipe.recipes.title);
}

module.exports = { StartHandlers, newSessionHandlers };
