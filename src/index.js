var Alexa = require('alexa-sdk');

var APP_ID = 'amzn1.ask.skill.85ae7ea2-b727-4d2a-9765-5c563a5ec379';

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

