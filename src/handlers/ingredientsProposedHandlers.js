var STATES = require('../util/state');
var Alexa = require('alexa-sdk');

var ingredientsProposedHandlers = Alexa.CreateStateHandler(STATES.INGREDIENTS_PROPOSED, {
    'yesIntent': function () {
        // user said they have the ingredients. begin listing steps to recipe
        this.handler.currentStep = 0;
        tellStep(this.handler.currentRecipe, this.handler.currentStep);
        currentWorkflowState = STATES.LIST_STEPS;
    },
    'noIntent': function () {
        this.handler.state = STATES.RECIPE_PROPOSED;
        suggestRecipe();
    },
    'Unhandled': function () {
        //this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
    }

});

function suggestRecipe() {
    this.handler.currentRecipe = getRandomRecipe();

    this.emit(':tell', "Would you like to make " + this.handler.currentRecipe.recipes.title);
}

module.exports = ingredientsProposedHandlers;
