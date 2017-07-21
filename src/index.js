var Alexa = require('alexa-sdk');
var STATES = require('./util/state')

var APP_ID = 'amzn1.ask.skill.85ae7ea2-b727-4d2a-9765-5c563a5ec379';

var SKILL_NAME = 'Snack Overflow';
var POSSIBLE_RECIPES = ['Chicken Parmesan', 'Spaghetti', 'Turkey Sandwich'];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context, callback);
    alexa.state = STATES.START;
    var startHandlers = require('./handlers/StartHandlers');
    alexa.registerHandlers(
        startHandlers.StartHandlers,
        startHandlers.newSessionHandlers,
        require('./handlers/FridgeHandlers'),
        require('./handlers/RecipeHandlers'),
        require('./handlers/AmazonDefaultHandlers'));
    alexa.execute();
};