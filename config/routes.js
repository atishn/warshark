module.exports = function (app, passport, auth) {

    /**
     * Routes
     */

    var users = require('../app/controllers/users')
    var game = require('../app/controllers/game')

    var nodes = require('../app/controllers/nodes')
    var map = require('../app/controllers/maps');


    app.get('/login', users.login)
    app.get('/signup', users.signup)
    app.get('/logout', users.logout)
    app.post('/users', users.create)
    app.post('/users/session', passport.authenticate('local', {failureRedirect: '/login', failureFlash: 'Invalid email or password.'}), game.home);
    app.get('/users/:userId', users.show)
    app.param('userId', users.user)


    app.get('/node', nodes.index)
    app.get('/node/:nodeId', nodes.show)
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
    app.get('/api/map/:name',auth.requiresLogin, map.findByName);
    app.post('/api/map', auth.requiresLogin, map.addMap);

// handle everything else that a route can't be found for
    app.get('*', function (req, res) {
        res.render('error');
    });
}





