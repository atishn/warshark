/**
 * Module dependencies.
 * Not Used yet.
 */

var nodes = require('../app/controllers/api/nodes')
    , maps = require('../app/controllers/api/maps')
    , regions = require('../app/controllers/api/regions')
    , games = require('../app/controllers/api/games')
    , users = require('../app/controllers/api/users')

module.exports = function (app, api, passport, auth) {

    /**
     * API Routes
     */

    api.addGet({
        spec: {
            path: '/api/node',
            summary: 'Get all nodes',
            responseClass: 'Node',
            nickname: 'getNodeList'
        },
        action: nodes.index
    });

    api.addGet({
        spec: {
            path: '/api/node/{nodeId}',
            summary: 'Get a node by ID',
            params: [api.pathParam('nodeId', 'ID of node', 'string')],
            responseClass: 'Node',
            nickname: 'getNodeById'
        },
        action: nodes.show
    });

    api.addPost({
        spec: {
            path: '/api/node/{nodeId}',
            summary: 'Update a node',
            method: 'POST',
            params: [api.pathParam('nodeId', 'ID of node', 'string'), api.postParam('Node', 'Node object that needs to be updated', ' ')],
            responseClass: 'Node',
            nickname: 'postNodeObject'
        },
        action: nodes.update
    });

    api.addDelete({
        spec: {
            path: '/api/node/{nodeId}',
            summary: 'Delete a node by id',
            method: 'DELETE',
            params: [api.pathParam('nodeId', 'ID of node', 'string')],
            nickname: 'deleteNodeObject'
        },
        action: nodes.remove
    });

    api.addPost({
        spec: {
            path: '/api/node/{nodeId}/neighbor',
            summary: 'Add neighbors',
            method: 'POST',
            params: [api.pathParam('nodeId', 'ID of node', 'string'), api.postParam('ID', 'Id of neighbor node', ' ')],
            responseClass: 'Node',
            nickname: 'addNeighbor'
        },
        action: nodes.addNeighbors
    });

    api.addDelete({
        spec: {
            path: '/api/node/{nodeId}/neighbor/{neighborNodeId}',
            summary: 'Delete a neighbor node by id',
            method: 'DELETE',
            params: [api.pathParam('nodeId', 'ID of node', 'string'), api.pathParam('neighborNodeId', 'ID of neighbor node', 'string')],
            nickname: 'deleteNeighbor'
        },
        action: nodes.removeNeighbor
    });

    app.param('nodeId', nodes.node)
    app.param('neighborNodeId', nodes.neighborNode)


    // Regions

    api.addGet({
        spec: {
            path: '/api/region',
            summary: 'Get all Regions',
            nickname: 'getRegionList'
        },
        action: regions.index
    });

    api.addGet({
        spec: {
            path: '/api/region/{regionId}',
            summary: 'Get a Regions by ID',
            params: [api.pathParam('regionId', 'ID of region', 'string')],
            nickname: 'getRegionById'
        },
        action: regions.show
    });


//    app.get('/api/region', regions.index)
//    app.get('/api/region/:regionId', regions.show)
    // app.post('/api/region', regions.create)         // Region will be created by Map API


    api.addPost({
        spec: {
            path: '/api/region/{regionId}',
            summary: 'Update a Region',
            method: 'POST',
            params: [api.pathParam('regionId', 'ID of Region', 'string'), api.postParam('Region', 'Region object that needs to be updated to the map', ' ')],
            nickname: 'postRegionObject'
        },
        action: nodes.update
    });

    api.addDelete({
        spec: {
            path: '/api/region/{regionId}',
            summary: 'Delete a Region by id',
            method: 'DELETE',
            params: [api.pathParam('regionId', 'ID of Region', 'string')],
            nickname: 'deleteRegionById'
        },
        action: nodes.remove
    });

    // Create node through this API CALL.
    api.addPost({
        spec: {
            path: '/api/region/{regionId}/node',
            summary: 'Add a node to the Region',
            method: 'POST',
            params: [api.pathParam('regionId', 'ID of Region', 'string'), api.postParam('Node', 'Node object that needs to be added in the Region', ' ')],
            nickname: 'addNodeToRegion'
        },
        action: nodes.addNode
    });

    api.addDelete({
        spec: {
            path: '/api/region/{regionId}/node/{nodeId}',
            summary: 'Delete a node from given Region',
            method: 'DELETE',
            params: [api.pathParam('regionId', 'ID of Region', 'string'), api.pathParam('nodeId', 'ID of Node', 'string')],
            nickname: 'deleteNodeFromRegion'
        },
        action: nodes.removeNode
    });

    // TODO: Get all nodes belongs to the region

    app.param('regionId', regions.region)


    // Map


    api.addGet({
        spec: {
            path: '/api/map',
            summary: 'Get all Maps',
            nickname: 'getMapList'
        },
        action: maps.index
    });

    api.addGet({
        spec: {
            path: '/api/map/{mapId}',
            summary: 'Get a Map by ID',
            params: [api.pathParam('mapId', 'ID of map', 'string')],
            nickname: 'getRegionById'
        },
        action: maps.show
    });

    //app.get('/api/map/:mapName',  map.show);

    api.addPost({
        spec: {
            path: '/api/map',
            summary: 'Create a Map',
            method: 'POST',
            params: [api.postParam('Map', 'Map object that needs to be created', ' ')],
            nickname: 'createMapObject'
        },
        action: maps.create
    });


    api.addPost({
        spec: {
            path: '/api/map/{mapId}',
            summary: 'Update a Map',
            method: 'POST',
            params: [api.pathParam('mapId', 'ID of Map', 'string'), api.postParam('Map', 'Map object that needs to be updated for the given id', ' ')],
            nickname: 'postMapObject'
        },
        action: maps.update
    });


    // app.post('/api/map', maps.create);
    //  app.post('/api/map/:mapId', maps.update);

    api.addPost({
        spec: {
            path: '/api/map/{mapId}/region',
            summary: 'Add a Region to the Map',
            method: 'POST',
            params: [api.pathParam('mapId', 'ID of Map', 'string'), api.postParam('Region', 'Region object that needs to be added in the Map', ' ')],
            nickname: 'addRegionToMap'
        },
        action: maps.addRegion
    });

//    api.addDelete({
//        spec: {
//            path: '/api/map/{mapId}/region/{regionId}',
//            summary: 'Delete a region from the map',
//            method: 'DELETE',
//            params: [api.pathParam('mapid', 'ID of Map', 'string'), api.pathParam('regionId', 'ID of Region', 'string')],
//            nickname: 'deleteRegionFromMap'
//        },
//        action: maps.removeRegion
//    });


//  TODO
//  api.addGet({
//        spec: {
//            path: '/api/map/{mapId}/region',
//            summary: 'Get all regions belong to the map',
//            method: 'GET',
//            params: [api.pathParam('mapId', 'ID of Map', 'string')],
//            nickname: 'getRegionFromMap'
//        },
//        action:  maps.regions
//    });


    //app.post('/api/map/:mapId/region', maps.addRegion); // Create Region through this API CALL
    //app.get('/api/map/:mapId/region/:regionId', regions.show);

    //app.delete('/api/map/:mapId/region/:regionId', maps.removeRegion); // Create Region through this API CALL

    app.param('mapId', maps.map);
    //app.param('mapName', map.findByName);

    // Game
    api.addGet({
        spec: {
            path: '/api/game',
            summary: 'Get all Games',
            nickname: 'getGameList'
        },
        action: games.index
    });

    api.addGet({
        spec: {
            path: '/api/game/{gameId}',
            summary: 'Get a Game by ID',
            params: [api.pathParam('gameId', 'ID of Game', 'string')],
            nickname: 'getGameById'
        },
        action: games.show
    });

    //   app.get('/api/game', games.index);
    //  app.get('/api/game/:gameId', games.show);

    api.addPost({
        spec: {
            path: '/api/game',
            summary: 'Create a Game',
            method: 'POST',
            params: [api.postParam('Game', 'Game object that needs to be created', ' ')],
            nickname: 'createGameObject'
        },
        action: games.create
    });


    //app.post('/api/game', games.create);

    api.addGet({
        spec: {
            path: '/api/game/{gameId}/start',
            summary: 'Start a game by Id',
            params: [api.pathParam('gameId', 'ID of Game', 'string')],
            nickname: 'startGameById'
        },
        action: games.show
    });


    api.addGet({
        spec: {
            path: '/api/game/{gameId}/restart',
            summary: 'Restart a game by Id',
            params: [api.pathParam('gameId', 'ID of Game', 'string')],
            nickname: 'restartGameById'
        },
        action: games.clearGame
    });

    api.addGet({
        spec: {
            path: '/api/game/{gameId}/user',
            summary: 'Show all subscribed uses',
            params: [api.pathParam('gameId', 'ID of Game', 'string')],
            nickname: 'showSubscribedUsers'
        },
        action: games.showUsers
    });

    api.addPost({
        spec: {
            path: '/api/game/{gameId}/user',
            summary: 'Subscribe a user to the Game',
            method: 'POST',
            params: [api.pathParam('gameId', 'ID of Game', 'string'), api.postParam('ID', 'ID of subscribed user', ' ')],
            nickname: 'subscriberUser'
        },
        action: games.addUser
    });

    api.addDelete({
        spec: {
            path: '/api/game/{gameId}/user/{userid}',
            summary: 'Unsubscribe a user to from the Game',
            method: 'DELETE',
            params: [api.pathParam('gameId', 'ID of Game', 'string'), api.pathParam('userid', 'ID of User', 'string')],
            nickname: 'unsubscribeUser'
        },
        action: games.removeUser
    });


    // app.get('/api/game/:gameId/start', games.startGame);
    // app.get('/api/game/:gameId/clear', games.clearGame);

    //app.get('/api/game/:gameId/user', games.showUsers);

    //app.post('/api/game/:gameId/user', games.addUser);
    //app.delete('/api/game/:gameId/user/:userId', games.removeUser);
    app.param('gameId', games.game);


    //User

    api.addGet({
        spec: {
            path: '/api/user',
            summary: 'List of users',
            nickname: 'ListOfUsers'
        },
        action: users.index
    });

    //
    api.addGet({
        spec: {
            path: '/api/user/{userid}/game',
            summary: 'List of Subscribed Games',
            params: [api.pathParam('userid', 'ID of User', 'string')],
            nickname: 'ListOfSubscribedGamesByUser'
        },
        action: users.getSubscribedGames
    });
    app.param('userid', users.user)


    //  app.get('/api/user', users.index)
    // app.get('/api/user/:userid/game', users.getSubscribedGames)


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

