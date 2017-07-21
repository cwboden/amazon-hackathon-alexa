var STATES = require('../util/state.js');

var startHandlers = Alexa.CreateStateHandler(STATES.START, {
    'whatShouldIMakeIntent': function () {
        this.handler.state = STATES.RECIPE_PROPOSED;
        suggestRecipe();
    },
    'askWhatsInFridgeIntent': function () {
        // get fridge list
        // var fridge = [...........]

        var strFridge = "no food";//fridge.join();
        this.emit(':tell', "You currently have " + strFridge);
    },
    'Unhandled': function () {
        //this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
    }

});

function suggestRecipe() {
    this.handler.currentRecipe = getRandomRecipe();

    this.emit(':tell', "Would you like to make " + this.handler.currentRecipe.recipes.title);
}

module.exports = startHandlers;