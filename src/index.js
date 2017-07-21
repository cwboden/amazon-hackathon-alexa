var Alexa = require('alexa-sdk');

var APP_ID = 'amzn1.ask.skill.85ae7ea2-b727-4d2a-9765-5c563a5ec379';

var SKILL_NAME = 'Snack Overflow';
var POSSIBLE_RECIPES = ['Chicken Parmesan', 'Spaghetti', 'Turkey Sandwich'];

var currentRecipe, currentRecipeName;

var WORKFLOW_STATES = {
    START : 1,
    RECIPE_PROPOSED : 2
};

var currentWorkflowState = WORKFLOW_STATES.START;

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(getRecipeHandlers);
    alexa.registerHandlers(utilHandlers);
    alexa.execute();
};

var getRecipeHandlers = {
    'whatShouldIMakeIntent': function () {
        suggestRecipe();
   }
};

var utilHandlers = {
    'affirmativeIntent': function () {
        doAffirmativeAction();
    },
    'negativeIntent': function () {
        doNegativeAction();
    }
};

function suggestRecipe() {
    var recipeNum = Math.floor(Math.random() * POSSIBLE_RECIPES.length);
    currentRecipeName = POSSIBLE_RECIPES[recipeNum];

    this.emit(':tell', "Would you like to make ", currentRecipeName);
    currentWorkflowState = WORKFLOW_STATES.RECIPE_PROPOSED;
}

function doAffirmativeAction() {
    switch (currentWorkflowState) {
        case (WORKFLOW_STATES.START):
            break;
        case (WORKFLOW_STATES.RECIPE_PROPOSED):
            currentRecipe = getRecipeFromAPI(currentRecipeName);
            tellRecipe(currentRecipe);
            break;
    }
}

function doNegativeAction() {
    switch (currentWorkflowState) {
        case (WORKFLOW_STATES.START):
            break;
        case (WORKFLOW_STATES.RECIPE_PROPOSED):
            suggestRecipe();
            break;
    }
}

function tellRecipe(recipe) {
    /*
    this.emit(":tell", "You will need");
    for (var i = 0; i < recipe.ingredients.length; i++) {
        this.emit(":tell", recipe.ingredients[i].quantity, "of", recipe.ingredients[i].name);
    }

    for (var i = 0; i < recipe.steps.length; i++) {
        this.emit)(":tell", recipe.steps[i]);
    }
    */
}