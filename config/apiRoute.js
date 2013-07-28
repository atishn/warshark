/**
 * Module dependencies.
 * Not Used yet.
 */

var nodes = require('../app/controllers/api/nodes')
    , map = require('../app/controllers/api/maps')
    , regions = require('../app/controllers/api/regions')
    , game = require('../app/controllers/api/games')
    , user = require('../app/controllers/api/users')

module.exports = function (app, api, passport, auth) {

    /**
     * API Routes
     */

        // Nodes
    app.get('/api/node', nodes.index)
    app.get('/api/node/:nodeId', nodes.show)

    //app.put('/api/node', nodes.create) // Node needs to be created only through Region API.

    app.post('/api/node/:nodeId', nodes.update)
    app.delete('/api/node/:nodeId', nodes.remove)

    app.post('/api/node/:nodeId/neighbor', nodes.addNeighbors)
    app.delete('/api/node/:nodeId/neighbor/:neighborNodeId', nodes.removeNeighbor)

    app.param('nodeId', nodes.node)
    app.param('neighborNodeId', nodes.neighborNode)

    // Regions
    app.get('/api/region', regions.index)
    app.get('/api/region/:regionId', regions.show)
    // app.post('/api/region', regions.create)         // Region will be created by Map API

    app.post('/api/region/:regionId', regions.update)

    app.delete('/api/region/:regionId', regions.remove)

    app.post('/api/region/:regionId/node', regions.addNode)  // Create node through this API CALL.
    app.delete('/api/region/:regionId/node/:nodeId', regions.removeNode)

    app.param('regionId', regions.region)

    // Map
    app.get('/api/map', map.index);
    app.get('/api/map/:mapId', map.show);
    //app.get('/api/map/:mapName',  map.show);

    app.post('/api/map', map.create);
    app.post('/api/map/:mapId', map.update);

    app.post('/api/map/:mapId/region', map.addRegion); // Create Region through this API CALL
    app.get('/api/map/:mapId/region/:regionId', regions.show);

    app.delete('/api/map/:mapId/region/:regionId', map.removeRegion); // Create Region through this API CALL

    app.param('mapId', map.map);
    //app.param('mapName', map.findByName);

    // Game

    app.get('/api/game/:gameId', game.show);
    app.post('/api/game', game.create);
    app.param('gameId', game.game);

    app.get('/api/game/:gameId/start', game.startGame);

    app.get('/api/game/:gameId/user', game.showUsers);
    app.post('/api/game/:gameId/user', game.addUser);
    app.delete('/api/game/:gameId/user/:userId', game.removeUser);


    //User
    app.get('/api/user', user.index)
}


// Swagger Entries. Try to add later when Swagger entries gets fixed.
//// Node
//app.addGet({
//    spec: {
//        path: '/api/node',
//        summary: 'Get all nodes',
//        responseClass: 'Node',
//        nickname: 'getNodeList'
//    },
//    action: nodes.index
//});
//
//app.addGet({
//    spec: {
//        path: '/api/node/{nodeId}',
//        summary: 'Get a node by ID',
//        params: [app.pathParam('nodeId', 'ID of node', 'string')],
//        responseClass: 'Node',
//        nickname: 'getNodeById'
//    },
//    action: nodes.show
//});
//
//app.addPut({
//    spec: {
//        path: '/api/node',
//        summary: 'Create a node',
//        method: 'PUT',
//        params: [app.postParam('Node', 'Node object that needs to be added to the map', 'Node')],
//        responseClass: 'Node',
//        nickname: 'putNodeObject'
//    },
//    action: nodes.create
//});
//
////    app.put('/api/node', nodes.create)
//
//app.addPost({
//    spec: {
//        path: '/api/node/{nodeId}',
//        summary: 'Create or Update a node',
//        method: 'POST',
//        params: [app.pathParam('nodeId', 'ID of node', 'string'), app.postParam('Node', 'Node object that needs to be added to the map', 'Node')],
//        responseClass: 'Node',
//        nickname: 'postNodeObject'
//    },
//    action: nodes.update
//});
//
////app.put('/api/node', nodes.create)
////app.post('/api/node/:nodeId', nodes.update)
//
//app.addDelete({
//    spec: {
//        path: '/api/node/{nodeId}',
//        summary: 'Delete a node',
//        method: 'DELETE',
//        params: [app.pathParam('nodeId', 'ID of node to be delete', 'string')],
//        responseClass: 'Node',
//        nickname: 'deleteNodeById'
//    },
//    action: nodes.remove
//});
//
//
////app.delete('/api/node/:nodeId', nodes.remove)
//
//
//app.addPost({
//    spec: {
//        path: '/api/node/{nodeId}/neighbor',
//        summary: 'Add a neighbor node',
//        method: 'POST',
//        params: [app.pathParam('nodeId', 'ID of node', 'string'), app.postParam('id', 'Id of node that needs to be added as a neighbor', 'string')],
//        responseClass: 'Node',
//        nickname: 'postNodeObject'
//    },
//    action: nodes.addNeighbors
//});
//
////app.post('/api/node/:nodeId/neighbor', nodes.addNeighbors)
//
//app.addDelete({
//    spec: {
//        path: '/api/node/{nodeId}/neighbor/{neighborNodeId}',
//        summary: 'Remove a neighbor node',
//        method: 'DELETE',
//        params: [app.pathParam('nodeId', 'ID of node', 'string'), app.pathParam('neighborNodeId', 'ID of neighborNode', 'string')],
//        nickname: 'removeNeighborById'
//    },
//    action: nodes.removeNeighbor
//});
//
////app.delete('/api/node/:nodeId/neighbor/:neighborNodeId', nodes.removeNeighbor)






