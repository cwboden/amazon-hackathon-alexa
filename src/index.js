var Alexa = require('alexa-sdk');
var states = require('./util/state')

var APP_ID = 'amzn1.ask.skill.85ae7ea2-b727-4d2a-9765-5c563a5ec379';

var SKILL_NAME = 'Snack Overflow';
var POSSIBLE_RECIPES = ['Chicken Parmesan', 'Spaghetti', 'Turkey Sandwich'];

var handlers = {
    // This will short-cut any incoming intent or launch requests and route them to this handler.
    'NewSession': function () {
        if (Object.keys(this.attributes).length === 0) { // Check if it's the first time the skill has been invoked
            /*
            // can init attributes here
            this.attributes['endedSessionCount'] = 0;
            this.attributes['gamesPlayed'] = 0;
            */
        }
        this.handler.state = states.START;
        this.emitWithState('Start');
    }
};

var startHandlers = Alexa.CreateStateHandler(states.START, require('./handlers/StartHandlers.js'));
var fridgeHandlers = Alexa.CreateStateHandler(states.FRIDGE, require('./handlers/FridgeHandlers.js'));
var cookHandlers = Alexa.CreateStateHandler(states.COOK, require('./handlers/RecipeHandlers.js'));

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appID = APP_ID;
    alexa.dynamoDBTableName = 'SnackOverflow';
    alexa.registerHandlers(handlers, startHandlers, fridgeHandlers, cookHandlers);
    alexa.execute();
}