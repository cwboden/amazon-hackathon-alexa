var STATES = require('../util/state.js');

var getFridgeHandlers = Alexa.CreateStateHandler(STATES.START, {
    'whatShouldIMakeIntent': function () {
        this.handler.state = STATES.RECIPE_PROPOSED;
        suggestRecipe();
    },
    'Unhandled': function () {
        //this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
    }

});

function suggestRecipe() {
    var currentRecipe = getRandomRecipe();

    this.emit(':tell', "Would you like to make ", currentRecipe.recipes.title);
}

module.exports = getRecipeHandlers;