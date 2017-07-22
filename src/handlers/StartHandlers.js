var FRIDGE = require('../util/fridge');
var STATES = require('../util/state');

var START_WELCOME_MESSAGE = "Welcome to Snack Overflow.";
var STARTOVER_WELCOME_MESSAGE = "Mmm, smells delicious!";
var START_REPROMPT_MESSAGE = "Would you like to view your fridge or start cooking?";
var STARTOVER_REPROMPT_MESSAGE = "If you'd like to make something else, now's the time!";

var StartHandlers = {
    "Start": function() {
        this.emit(":ask", START_WELCOME_MESSAGE + " " + START_REPROMPT_MESSAGE, START_REPROMPT_MESSAGE);
    },
    "Startover": function () {
        this.emit(":ask", STARTOVER_WELCOME_MESSAGE + " " + STARTOVER_REPROMPT_MESSAGE, STARTOVER_REPROMPT_MESSAGE);
    },
    'FridgeIntent': function () {
        this.handler.state = STATES.FRIDGE_STATE;
        this.emitWithState('Fridge');
    },
    'CookIntent': function () {
        this.handler.state = STATES.COOK_STATE;
        this.emitWithState('Cook');
    },
    'Unhandled': function () {
        //this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
    }

}

module.exports = StartHandlers;
