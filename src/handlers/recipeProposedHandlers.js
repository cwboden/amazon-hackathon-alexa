var STATES = require('../util/state');
var Alexa = require('alexa-sdk');

var recipeProposedHandlers = Alexa.CreateStateHandler(STATES.RECIPE_PROPOSED, {
    'yesIntent': function () {
        this.handler.state = STATES.INGREDIENTS_PROPOSED;
        tellIngredients(this.handler.currentRecipe);
        currentWorkflowState = WORKFLOW_STATES.INGREDIENTS_PROPOSED;
    },
    'noIntent': function () {
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

module.exports = recipeProposedHandlers;
