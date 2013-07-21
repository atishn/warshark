/**
 * Module dependencies.
 */

module.exports = function (app, api, config) {


    api.addModels({
        models: {
            "Node": {
                "id": "Node",
                "properties": {
                    "id": { "type": "string" },
                    "name": { "type": "string" },
                    "color": { "type": "string" },
                    "units": { "type": "int" }
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
