var STATES = require('../util/state.js');

var StartHandlers = Alexa.CreateStateHandler(STATES.START, {
    'OpenMyFridgeIntent': function () {
        this.handler.state = STATES.FRIDGE_STATE;
    },
    'FindARecipeIntent': function () {
        this.handler.state = STATES.RECIPE_STATE;
    },
    'Unhandled': function () {
        //this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
    }

});

module.exports = StartHandlers;