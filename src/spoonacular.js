var unirest = require('unirest');
var MASHAPE_KEY = 'r2fsWqchjGmshJwpRUP74Rc5uhPpp1ZqUBfjsnwMgkAUfqluM2';

function SearchByIngredients(queries, callback) {

    var ingredients = queries.join('+');
    var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" +
                "search?instructionsRequired=true&limitLicense=false&number=1&offset=0&query=" +
                ingredients + "&type=main+course";
    
    return unirest.get(url)
        .header("X-Mashape-Key", "r2fsWqchjGmshJwpRUP74Rc5uhPpp1ZqUBfjsnwMgkAUfqluM2")
        .header("Accept", "application/json")
        .end(function(response, error) {
            var data = response.body.data;
            console.log(response);
            console.log(data);
            if (!error && response.statusCode == 200 && data != null && data != undefined) {
                callback(data);
            } else {
                console.log('Failed response');
            }
    });

}

function getRandomRecipe(callback) {
    return unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=1")
            .header("X-Mashape-Key", MASHAPE_KEY)
            .header("Accept", "application/json")
            .end(function(response, error) {
        var data = response.body.data;
        if (!error && response.statusCode == 200) {
            callback(returnData(data));
        } else {
            console.log('Failed response');
        }
    });
}

function ingredientList(recipe) {
    var list = [];

    for(var i = 0; i < recipe.recipes.extendedIngredients.length; i++) {
        var item = recipe.recipes.extendedIngredients[i];
        list.push(item.amount + ' ' + item.unit + ' ' + item.name);
    }

    return list;
}

function instructionList(recipe) {
    return recipe.instructions.split('.');
}

var sampleRecipe = {
  "recipes": [
    {
      "vegetarian": false,
      "vegan": false,
      "glutenFree": true,
      "dairyFree": true,
      "veryHealthy": false,
      "cheap": false,
      "veryPopular": false,
      "sustainable": false,
      "weightWatcherSmartPoints": 4,
      "gaps": "no",
      "lowFodmap": false,
      "ketogenic": false,
      "whole30": false,
      "servings": 8,
      "preparationMinutes": 5,
      "cookingMinutes": 10,
      "sourceUrl": "http://www.dizzybusyandhungry.com/ramen-noodle-coleslaw/",
      "spoonacularSourceUrl": "https://spoonacular.com/ramen-noodle-coleslaw-556177",
      "aggregateLikes": 221,
      "creditText": "Dizzy Busy and Hungry",
      "sourceName": "Dizzy Busy and Hungry",
      "extendedIngredients": [
        {
          "id": 12061,
          "aisle": "Nuts",
          "image": "https://spoonacular.com/cdn/ingredients_100x100/almonds.jpg",
          "name": "almonds",
          "amount": 0.25,
          "unit": "cup",
          "unitShort": "c",
          "unitLong": "cups",
          "originalString": "¼ cup sliced almonds",
          "metaInformation": [
            "sliced"
          ]
        },
        {
          "id": 10011109,
          "aisle": "Produce",
          "image": "https://spoonacular.com/cdn/ingredients_100x100/coleslaw.png",
          "name": "coleslaw mix",
          "amount": 1,
          "unit": "bag",
          "unitShort": "bag",
          "unitLong": "bag",
          "originalString": "1 bag shredded cabbage/coleslaw mix",
          "metaInformation": [
            "shredded"
          ]
        },
        {
          "id": 6016,
          "aisle": "Canned and Jarred",
          "image": "https://spoonacular.com/cdn/ingredients_100x100/cream-of-chicken-soup.jpg",
          "name": "cream of chicken soup",
          "amount": 1,
          "unit": "package",
          "unitShort": "pkg",
          "unitLong": "package",
          "originalString": "1 package chicken flavor ramen noodle soup",
          "metaInformation": []
        },
        {
          "id": 11291,
          "aisle": "Produce",
          "image": "https://spoonacular.com/cdn/ingredients_100x100/green-onion.jpg",
          "name": "green onions",
          "amount": 5,
          "unit": "",
          "unitShort": "",
          "unitLong": "",
          "originalString": "5 green onions, chopped",
          "metaInformation": [
            "green",
            "chopped"
          ]
        },
        {
          "id": 4053,
          "aisle": "Oil, Vinegar, Salad Dressing",
          "image": "https://spoonacular.com/cdn/ingredients_100x100/olive-oil.jpg",
          "name": "olive oil",
          "amount": 2,
          "unit": "tablespoons",
          "unitShort": "T",
          "unitLong": "tablespoons",
          "originalString": "2 tablespoons olive oil",
          "metaInformation": []
        },
        {
          "id": 1002030,
          "aisle": "Spices and Seasonings",
          "image": "https://spoonacular.com/cdn/ingredients_100x100/pepper.jpg",
          "name": "pepper",
          "amount": 0.5,
          "unit": "teaspoon",
          "unitShort": "t",
          "unitLong": "teaspoons",
          "originalString": "½ teaspoon pepper",
          "metaInformation": []
        },
        {
          "id": 2047,
          "aisle": "Spices and Seasonings",
          "image": "https://spoonacular.com/cdn/ingredients_100x100/salt.jpg",
          "name": "salt",
          "amount": 0.5,
          "unit": "teaspoon",
          "unitShort": "t",
          "unitLong": "teaspoons",
          "originalString": "½ teaspoon salt",
          "metaInformation": []
        },
        {
          "id": 12023,
          "aisle": "Ethnic Foods",
          "image": "https://spoonacular.com/cdn/ingredients_100x100/sesame-seeds.jpg",
          "name": "sesame seeds",
          "amount": 3,
          "unit": "tablespoons",
          "unitShort": "T",
          "unitLong": "tablespoons",
          "originalString": "3 tablespoons sesame seeds",
          "metaInformation": []
        },
        {
          "id": 19335,
          "aisle": "Baking",
          "image": "https://spoonacular.com/cdn/ingredients_100x100/white-sugar.jpg",
          "name": "sugar",
          "amount": 3,
          "unit": "tablespoons",
          "unitShort": "T",
          "unitLong": "tablespoons",
          "originalString": "3 tablespoons sugar",
          "metaInformation": []
        },
        {
          "id": 2053,
          "aisle": "Oil, Vinegar, Salad Dressing",
          "image": "https://spoonacular.com/cdn/ingredients_100x100/vinegar-(white).jpg",
          "name": "vinegar",
          "amount": 3,
          "unit": "tablespoons",
          "unitShort": "T",
          "unitLong": "tablespoons",
          "originalString": "3 tablespoons vinegar",
          "metaInformation": []
        }
      ],
      "id": 556177,
      "title": "Ramen Noodle Coleslaw",
      "readyInMinutes": 15,
      "image": "https://spoonacular.com/recipeImages/Ramen-Noodle-Coleslaw-556177.jpg",
      "imageType": "jpg",
      "instructions": "Toast the sesame seeds, about 350 degrees in the oven for about 10-15 minutes. Keep an eye on them to make sure they don't burn.Mix together the following to make the dressing: olive oil, vinegar, sugar, salt, pepper, green onions, chicken flavor packet from the ramen noodle package.Crush the ramen noodles until there are no large chunks (small chunks are OK).Combine the shredded cabbage and ramen noodles in a large bowl.Pour the dressing on the cabbage/noodle mixture and toss to coat.Top with the toasted sesame seeds and almonds."
    }
  ]
}

module.exports = { instructionList, ingredientList, getRandomRecipe, SearchByIngredients };
