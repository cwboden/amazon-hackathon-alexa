var Alexa = require('alexa-sdk');

var APP_ID = 'amzn1.ask.skill.933585d3-ba4a-49f9-baed-86e109c589ed';

var SKILL_NAME = 'Google Home Mediator';
var WAKE_PHRASES = ['Hey Google,', 'Okay Google,'];

exports.handler = function(event, context, callback) {
   var alexa = Alexa.handler(event, context, callback);
   alexa.registerHandlers(askGoogleHandlers);
   alexa.execute();
};

var askGoogleHandlers = {
   'AskGoogleHomeIntent': function() {
      var request = this.event.request.intent.slots.request.value;

      var wakeNum = Math.floor(Math.random() * 1.9);
      this.emit(':tell', WAKE_PHRASES[wakeNum] + ' ' + request);
   }
};

