/**
 * Module dependencies.
 */

module.exports = function (app, swagger, config) {


    swagger.addModels({
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

    /*swagger.addValidator(
     function validate(req, path, httpMethod) {
     return true;
     }
     );*/

    swagger.setAppHandler(app);

    swagger.configureSwaggerPaths("", "/api-docs", "");

    swagger.configure("http://localhost:3000", "0.1"); //TODO: from config

}
