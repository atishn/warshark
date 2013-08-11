/**
 * Module dependencies.
 * Not Used yet.
 */

var nodes = require('../app/controllers/api/nodes')
    , maps = require('../app/controllers/api/maps')
    , regions = require('../app/controllers/api/regions')
    , games = require('../app/controllers/api/games')
    , users = require('../app/controllers/api/users')
    , db_content = require('../app/controllers/api/populatedb')


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

    api.addPost({
        spec: {
            path: '/api/region/{regionId}',
            summary: 'Update a Region',
            method: 'POST',
            params: [api.pathParam('regionId', 'ID of Region', 'string'), api.postParam('Region', 'Region object that needs to be updated to the map', ' ')],
            nickname: 'postRegionObject'
        },
        action: regions.update
    });

    api.addDelete({
        spec: {
            path: '/api/region/{regionId}',
            summary: 'Delete a Region by id',
            method: 'DELETE',
            params: [api.pathParam('regionId', 'ID of Region', 'string')],
            nickname: 'deleteRegionById'
        },
        action: regions.remove
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
        action: regions.addNode
    });

    // TODO: Get all nodes belongs to the region

    api.addGet({
        spec: {
            path: '/api/region/{regionId}/node',
            summary: 'Get all nodes belongs to Regions',
            params: [api.pathParam('regionId', 'ID of region', 'string')],
            nickname: 'getNodesbyRegionById'
        },
        action: regions.node
    });


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


    api.addDelete({
        spec: {
            path: '/api/map/{mapId}',
            summary: 'Delete a Map by id',
            method: 'DELETE',
            params: [api.pathParam('mapId', 'ID of Map', 'string')],
            nickname: 'deleteMapById'
        },
        action: maps.remove
    });

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

    api.addGet({
        spec: {
            path: '/api/map/{mapId}/region',
            summary: 'Get all regions belong to the map',
            method: 'GET',
            params: [api.pathParam('mapId', 'ID of Map', 'string')],
            nickname: 'getRegionFromMap'
        },
        action: maps.region
    });


    app.param('mapId', maps.map);


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


    api.addGet({
        spec: {
            path: '/api/game/{gameId}/start',
            summary: 'Start a game by Id',
            params: [api.pathParam('gameId', 'ID of Game', 'string')],
            nickname: 'startGameById'
        },
        action: games.startGame
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

    //
    api.addDelete({
        spec: {
            path: '/api/user/{userid}',
            summary: 'Delete user by userid',
            params: [api.pathParam('userid', 'ID of User', 'string')],
            nickname: 'deleteUserById'
        },
        action: users.remove
    });

    app.param('userid', users.user)


    // Populate DB
    api.addPost({
        spec: {
            path: '/api/populate/{gameName}',
            summary: 'Populate DB with dummy data for testing',
            method: 'POST',
            params: [api.pathParam('gameName', 'Name of Game', 'string'), api.queryParam('regionCount', 'Number of Regions', 'number'), api.queryParam('nodeCount', 'Number of Nodes per region', 'number')],
            nickname: 'populateGameDatabase'
        },
        action: db_content.populate
    });

    app.param('gameName', db_content.db)

}