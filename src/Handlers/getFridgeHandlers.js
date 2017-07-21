var STATES = require('../util/state.js');

var getFridgeHandlers = Alexa.CreateStateHandler(STATES.START, {
    'AskWhatsInFridgeIntent': function () {
        // get fridge list
        // var fridge = [...........]

        var strFridge = "no food";//fridge.join();
        this.emit(':tell', "You currently have " + strFridge);
    },
    'Unhandled': function () {
        //this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
    }

});

module.exports = getFridgeHandlers;