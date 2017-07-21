var STATES = require('../util/state');

var listStepsHandlers = Alexa.CreateStateHandler(STATES.LIST_STEPS, {
    'yesIntent': function () {
        // user is ready for the next step
        this.handler.currentStep++;
        tellStep(this.handler.currentRecipe, this.handler.currentStep);
    },
    'noIntent': function () {
        tellStep(this.handler.currentRecipe, this.handler.currentStep);
    },
    'Unhandled': function () {
        //this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
    }

});

module.exports = listStepsHandlers;