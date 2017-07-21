var AWS = require("aws-sdk");

AWS.config.loadFromPath('./config.json');

var docClient = new AWS.DynamoDB.DocumentClient();

var userDao = {
    table: {
    name: "snackOverflowUsers",
        fields: {
            fridgeList: "fridgeList",
            currentRecipe: "currentRecipe",
            currentStep: "currentStep"
        }
    },
    putFridgeItem: function(userId, item, cb) {
        var params = {
            TableName: this.table.name,
            Key:{
                "userId": userId
            },
            UpdateExpression: "set #list = list_append(if_not_exists(#list, :emptyList), :newItem)",
            ExpressionAttributeNames: {
                "#list":"fridgeList"
            },
            ExpressionAttributeValues: {
                ":newItem":[{"S":item}],
                ":emptyList":[]
            },
            ReturnValues:"ALL_NEW"
        };

        docClient.update(params, cb);
    },
    getUserData: function(userId, cb) {
        var params = {
            TableName: this.table.name,
            Key:{
                "userId": userId
            }
        };

        docClient.get(params, cb);
    }
}

module.exports = userDao;