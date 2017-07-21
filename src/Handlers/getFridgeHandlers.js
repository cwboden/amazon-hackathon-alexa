var getFridgeHandlers = {
    'AskWhatsInFridgeIntent': function () {
        // get fridge list
        // var fridge = [...........]

        var strFridge = "no food";//fridge.join();
        this.emit(':tell', "You currently have " + strFridge);
    }
};

module.exports = getFridgeHandlers;