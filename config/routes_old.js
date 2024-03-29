/**
 * Module dependencies.
 */

var users = require('../app/controllers/api/users')
    , game = require('../app/controllers/app/game')
    , nodes = require('../app/controllers/api/nodes')
    , map = require('../app/controllers/api/maps');
;

module.exports = function (app, api, passport, auth) {

    /**
     * Routes
     */

    var users = require('../app/controllers/api/users')
    var game = require('../app/controllers/app/game')

    var nodes = require('../app/controllers/api/nodes')
    var regions = require('../app/controllers/api/regions')
    var map = require('../app/controllers/api/maps');

    // Login/Admin
    app.get('/login', users.login)
    app.get('/signup', users.signup)
    app.get('/logout', users.logout)
    app.post('/users', users.create)
    app.post('/users/session', passport.authenticate('local', {failureRedirect: '/login', failureFlash: 'Invalid email or password.'}), game.home);
    app.get('/users/:userId', users.show)
    app.param('userId', users.user)


    app.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email', 'user_about_me'], failureRedirect: '/login' }), users.signin)
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), users.authCallback)
    app.get('/auth/github', passport.authenticate('github', { failureRedirect: '/login' }), users.signin)
    app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), users.authCallback)
    app.get('/auth/twitter', passport.authenticate('twitter', { failureRedirect: '/login' }), users.signin)
    app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), users.authCallback)
    app.get('/auth/google', passport.authenticate('google', { failureRedirect: '/login', scope: 'https://www.google.com/m8/feeds' }), users.signin)
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', scope: 'https://www.google.com/m8/feeds' }), users.authCallback)


    // Game
    app.get('/', passport.authenticate('local', {failureRedirect: '/login', failureFlash: 'Invalid email or password.'}), game.home);
    app.get('/home', auth.requiresLogin, game.home);
    app.get('/game/:id', auth.requiresLogin, game.game);
    app.get('/mapmaker', auth.requiresLogin, game.mapmaker);



    // Nodes
    app.get('/api/node', nodes.index)
    app.get('/api/node/:nodeId', nodes.show)
    app.put('/api/node', nodes.create)
    app.post('/api/node/:nodeId', nodes.update)
    app.delete('/api/node/:nodeId', nodes.remove)
    app.post('/api/node/:nodeId/neighbor', nodes.addNeighbors)
    app.delete('/api/node/:nodeId/neighbor/:neighborNodeId', nodes.removeNeighbor)

    app.param('nodeId', nodes.node)
    app.param('neighborNodeId', nodes.neighborNode)


    // Regions
    app.get('/api/region', regions.index)
    app.get('/api/region/:regionId', regions.show)
    app.put('/api/region', regions.create)
    app.post('/api/region/:regionId', regions.update)
    app.delete('/api/region/:regionId', regions.remove)

    app.put('/api/region/:regionId/node', regions.addNode)

    app.param('regionId', regions.region)

    // Map

    app.get('/api/map/:mapId', auth.requiresLogin, map.show);

    //app.get('/api/map/:mapName', auth.requiresLogin, map.show);
    app.post('/api/map', auth.requiresLogin, map.update);
    app.post('/api/map', auth.requiresLogin, map.update);

    app.put('/api/map', auth.requiresLogin, map.create);
    //app.put('/map', auth.requiresLogin, map.create);


    app.param('mapId', map.map);
    app.param('mapName', map.findByName);

}






