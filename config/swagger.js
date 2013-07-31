/**
 * Module dependencies.
 */

module.exports = function (app, api, config) {


    api.addModels({
        models: {
            "Node": {
                "id": "Node",
                "properties": {
                    "_id": { "type": "string" },
                    "name": { "type": "string" },
                    "color": { "type": "string" },
                    "coordinates": {
                        "type": "Coordinates",
                        "$ref": "Coordinates"
                    },
                    "units": { "type": "int" }
                }
            }, "Region": {
                "id": "Region",
                "properties": {
                    "_id": { "type": "string" },
                    "name": { "type": "string" },
                    "color": { "type": "string" },
                    "unitBonus": { "type": "int" },
                    "nodeCount": { "type": "int" }
                }
            },
            "Coordinates": {
                "id": "Coordinates",
                "properties": {
                    "x": {"type": "string" },
                    "y": {"type": "string" }
                }
            },
            "ID": {
                "id": "ID",
                "properties": {
                    "id": { "type": "string"}
                }
            }
        }
    });

    api.addValidator(
        function validate(req, path, httpMethod) {
            return true;
        }
    );

    api.setAppHandler(app);

    api.configureSwaggerPaths("", "/api-docs", "");

    api.configure("http://localhost:3000", "0.1"); //TODO: from config

}
