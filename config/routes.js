/**
 * Module dependencies.
 */

var users = require('../app/controllers/users')
  , game = require('../app/controllers/game')
  , nodes = require('../app/controllers/nodes')
  , map = require('../app/controllers/maps');;

module.exports = function (app, passport, auth, swagger) {

    /**
     * Routes
     */

  app.get('/login', users.login)
  app.get('/signup', users.signup)
  app.get('/logout', users.logout)
  app.post('/users', users.create)
  app.post('/users/session', passport.authenticate('local', {failureRedirect: '/login', failureFlash: 'Invalid email or password.'}), game.home);
  app.get('/users/:userId', users.show)
  app.param('userId', users.user)

  swagger.addGet({
    spec: {
      path: '/node',
      summary : 'Get all nodes',
      responseClass: 'Node',
      nickname: 'getNodeList'
    },
    action: nodes.index
  });

  swagger.addGet({
    spec: {
      path: '/node/{nodeId}',
      summary : 'Get a node by ID',
      params : [swagger.pathParam('nodeId', 'ID of node', 'string')],
      responseClass: 'Node',
      nickname: 'getNodeById'
    },
    action: nodes.show
  });

    //app.get('/node', nodes.index)
    //app.get('/node/:nodeId', nodes.show)
    app.put('/node', nodes.create)
    app.post('/node/:nodeId', nodes.update)
    app.delete('/node/:nodeId', nodes.remove)

    app.post('/node/:nodeId/neighbor', nodes.addNeighbors)
    app.delete('/node/:nodeId/neighbor/:neighborNodeId', nodes.removeNeighbor)


    app.param('nodeId', nodes.node)
    app.param('neighborNodeId', nodes.neighborNode)




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
    app.get('/mapmaker', auth.requiresLogin,  game.mapmaker);


    // Map

    app.get('/map/:mapId', auth.requiresLogin, map.show);

    app.get('/api/map/:mapName',auth.requiresLogin, map.show);
    app.post('/api/map', auth.requiresLogin, map.update);
    app.post('/map', auth.requiresLogin, map.update);

    app.put('/api/map', auth.requiresLogin, map.create);
    app.put('/map', auth.requiresLogin, map.create);


    app.param('mapId', map.map);
    app.param('mapName',map.findByName);


// handle everything else that a route can't be found for
    /*app.get('*', function (req, res) {
        res.render('error');
    });*/
}






