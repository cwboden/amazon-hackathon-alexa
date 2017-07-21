var FRIDGE = [];

function getItemsInFridge() {
    return FRIDGE;
}

function addItemToFridge(item) {
    FRIDGE.push(item);
}

function removeItemFromFridge(item) {
    var idx = FRIDGE.indexOf(item);

    if (idx > -1) {
        array.splice(idx, 1);
    }
}

module.exports = [getItemsInFridge, addItemToFridge, removeItemFromFridge];