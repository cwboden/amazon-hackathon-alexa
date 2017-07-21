var STATES = require('../util/state.js');

var utilHandlers = Alexa.CreateStateHandler(STATES.START, {
    'affirmativeIntent': function () {
        doAffirmativeAction();
    },
    'negativeIntent': function () {
        doNegativeAction();
    },
    'nextStepIntent': function () {
        tellStep(currentRecipe, ++currentStep);
    },
    'repeatStepIntent': function () {
        tellStep(currentRecipe, currentStep);
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

var utilHandlers = {
    'affirmativeIntent': function () {
        doAffirmativeAction();
    },
    'negativeIntent': function () {
        doNegativeAction();
    },
    'nextStepIntent': function () {
        tellStep(currentRecipe, ++currentStep);
    },
    'repeatStepIntent': function () {
        tellStep(currentRecipe, currentStep);
    }
};

var currentRecipe, currentRecipeName, currentStep = 0;

function doAffirmativeAction() {
    switch (currentWorkflowState) {
        case (WORKFLOW_STATES.START):
            break;
        case (WORKFLOW_STATES.RECIPE_PROPOSED):
            // user said they wanted to do the proposed recipe. ask if they have ingredients
            currentRecipe = getRandomRecipe(currentRecipeName);
            tellIngredients(currentRecipe);
            currentWorkflowState = WORKFLOW_STATES.INGREDIENTS_PROPOSED;
            break;
        case (WORKFLOW_STATES.INGREDIENTS_PROPOSED):
            // user said they have the ingredients. begin listing steps to recipe
            tellStep(currentRecipe, currentStep);
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
        case (WORKFLOW_STATES.INGREDIENTS_PROPOSED):
            // TODO: insert 'would you like to buy ingredients?' logic
            suggestRecipe();
            break;
    }
}

function tellRecipe(recipe) {
    this.emit(":tell", "You will need");

    for (var i = 0; i < recipe.extendedIngredients.length; i++) {
        this.emit(":tell", recipe.extendedIngredients[i].originalString);
    }

    this.emit(":tell", "Do you have these ingredients?");
}

function tellStep(recipe, step) {
    // TODO: insert logic for no more steps
    this.emit(":tell", recipe.instructions[step]);
    this.emit(":tell", "Tell me when you're ready for the next step, or if you need to hear that step again.");
}

module.exports = utilHandlers;