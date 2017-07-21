var Alexa = require('alexa-sdk');

var handlers = [require('./Handlers/getFridgeHandlers.js'),
                require('./Handlers/getRecipeHandlers.js'),
                require('./Handlers/utilHandlers.js')]

var APP_ID = 'amzn1.ask.skill.85ae7ea2-b727-4d2a-9765-5c563a5ec379';

var SKILL_NAME = 'Snack Overflow';
var POSSIBLE_RECIPES = ['Chicken Parmesan', 'Spaghetti', 'Turkey Sandwich'];


var WORKFLOW_STATES = {
    START : 1,
    RECIPE_PROPOSED: 2,
    INGREDIENTS_PROPOSED: 3
};

var currentWorkflowState = WORKFLOW_STATES.START;

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};



