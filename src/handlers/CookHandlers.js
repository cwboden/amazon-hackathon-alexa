var STATES = require('../util/state');
var FRIDGE = require('../util/fridge');
var spoonacular = require('../spoonacular');

var COOK_WELCOME_MESSAGE = "Welcome to the kitchen.";
var COOK_REPROMPT_MESSAGE = "Would you like me to suggest something to cook?";
var RECOMMENDED_RECIPE_MESSAGE = "How about making ";
var RECOMMENDED_RECIPE_REPROMPT = "Say yes to begin cooking or no to pick another recipe.";

var RecipeStateHandlers = {
    "Cook": function () {
        this.emit(":ask", COOK_WELCOME_MESSAGE, COOK_REPROMPT_MESSAGE);
    },
    "FridgeIntent": function () {
        this.handler.state = STATES.FRIDGE_STATE;
        this.emitWithState("Fridge");
    },
    'WhatShouldIMakeIntent': function () {
        // Get items from fridge
        var possibleIngredients = this.attributes['fridgeList'];
        var that = this;
        // Pick random recipe based on ingredients
        spoonacular.SearchByIngredients(possibleIngredients, function(results) {
            if (!results) {
                that.emit(":tell", "I can't find anything to cook with the ingredients in your fridge.");
            }
            else {
                that.attributes['recipe'] = results[0];
                // Have Alexa echo recipe name
                that.emit(":ask", RECOMMENDED_RECIPE_MESSAGE + that.attributes['recipe'].title, RECOMMENDED_RECIPE_REPROMPT);
            }
        });
    },
    "YesIntent": function () {
        if (!this.attributes['recipe']) {
            this.emit('WhatShouldIMakeIntent');
        }
        // User wants to cook recipe. Start listing steps.
        if (this.attributes['stepCounter'] == null) {
            var steps = spoonacular.instructionList(this.attributes['recipe']);
            this.attributes['stepCounter'] = 0;
            this.attributes['recipeSteps'] = steps;
        } else if (this.attributes['stepCounter'] >= this.attributes['recipeSteps'].length) {
            this.emitWithState("Startover");
        } else {
            this.attributes['stepCounter']++;
        }

        this.emit(":tell", this.attributes['recipeSteps'][this.attributes['stepCounter']]);
    },
    "RepeatIntent": function () {
        if (!this.attributes['recipe']) {
            this.emit('WhatShouldIMakeIntent');
        }
        var steps = spoonacular.instructionList(this.attributes['recipe']);
        this.emit(":tell", steps[this.attributes['stepCounter']]);
    },
    "NoIntent": function () {
        // User wants to try a different recipe. Try again.
        this.emit('WhatShouldIMakeIntent');
    },
    "AMAZON.StopIntent": function() {
        this.emit(":tell", EXIT_MESSAGE);
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":tell", EXIT_MESSAGE);
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.emitWithState("Cook");
    }
};

module.exports = RecipeStateHandlers;
