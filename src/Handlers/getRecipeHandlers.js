var getRecipeHandlers = {
    'whatShouldIMakeIntent': function () {
        suggestRecipe();
   }
};

function suggestRecipe() {
    var currentRecipe = getRandomRecipe();

    this.emit(':tell', "Would you like to make ", currentRecipe.recipes.title);
    currentWorkflowState = WORKFLOW_STATES.RECIPE_PROPOSED;
}

module.exports = getRecipeHandlers;