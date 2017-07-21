var Alexa = require('alexa-sdk');

var APP_ID = 'amzn1.ask.skill.933585d3-ba4a-49f9-baed-86e109c589ed';

var SKILL_NAME = 'Snack Overflow';
var POSSIBLE_RECIPIES = [ 'Chicken Parmesan', 'Spaghetti', 'Turkey Sandwich' ];

exports.handler = function(event, context, callback) {
   var alexa = Alexa.handler(event, context, callback);
   alexa.registerHandlers(getRecipieHandlers);
   alexa.execute();
};

var getRecipieHandlers = {
   'whatShouldIMakeIntent': function() {
       var recipieNum = Math.floor(Math.random() * POSSIBLE_RECIPIES.length);
       
       this.emit(':tell', POSSIBLE_RECIPIES[recipieNum]);
   }
};

