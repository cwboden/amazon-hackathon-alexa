var Alexa = require('alexa-sdk');

var APP_ID = 'amzn1.ask.skill.85ae7ea2-b727-4d2a-9765-5c563a5ec379';

var SKILL_NAME = 'Snack Overflow';
var POSSIBLE_RECIPES = ['Chicken Parmesan', 'Spaghetti', 'Turkey Sandwich'];

var currentRecipe, currentRecipeName, currentStep = 0;

var WORKFLOW_STATES = {
    START : 1,
    RECIPE_PROPOSED: 2,
    INGREDIENTS_PROPOSED: 3
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
    },
    'nextStepIntent': function () {
        tellStep(currentRecipe, ++currentStep);
    },
    'repeatStepIntent': function () {
        tellStep(currentRecipe, currentStep);
    }
};

function suggestRecipe() {
    var currentRecipe = getRandomRecipe();

    this.emit(':tell', "Would you like to make ", currentRecipe.recipes.title);
    currentWorkflowState = WORKFLOW_STATES.RECIPE_PROPOSED;
}

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

var getFridgeHandlers = {
	'AskWhatsInFridgeIntent': function() {
		// get fridge list
		// var fridge = [...........]
		
		var strFridge = fridge.join();
		this.emit(':tell', "You currently have " + strFridge);
	}
};

function tellRecipe(recipe) {
    this.emit(":tell", "You will need");

    for (var i = 0; i < recipe.extendedIngredients.length; i++) {
        this.emit(":tell", recipe.extendedIngredients[i].originalString);
    }
<<<<<<< HEAD

    this.emit(":tell", "Do you have these ingredients?");
}

function tellStep(recipe, step) {
    // TODO: insert logic for no more steps
    this.emit(":tell", recipe.instructions[step]);
    this.emit(":tell", "Tell me when you're ready for the next step, or if you need to hear that step again.");
}
=======
    */
}
>>>>>>> 9841240931972f38e0cccd104cc0cc415b91aac6
