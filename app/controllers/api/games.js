var mongoose = require('mongoose')
    , async = require('async')
    , _ = require('underscore')
    , Game = mongoose.model('Game')
    , Map = mongoose.model('Map')
    , Region = mongoose.model('Region')
    , Node = mongoose.model('Node')
    , NodeState = mongoose.model('NodeState')
    , User = mongoose.model('User')
    , UserGame = mongoose.model('UserGame')

var DEFAULT_USER_MOVES = 3;
/**
 * Create Game
 */

exports.create = function (req, res) {

    var game = new Game(req.body)
    game.createdAt = Date.now();
    game.status = 'New';

    game.save(function (err) {
        if (err) {
            console.log(err);
            return res.send(500, err);
        }
        res.send(201, game);
    })
}


/**
 * Add User to Game
 */

exports.addUser = function (req, res) {
    var game = req.game;

    if (game.status != 'New') {
        return res.send(new Error("You cannot add user to running game. Please reset the game."))
    }
    var userId = req.body.id;

    if (userId instanceof Array) {
        for (var i = 0; i < userId.length; i++) {
            subscribeUser(game, userId[i])

        }
    } else {
        subscribeUser(game, userId)
    }
    res.send(game);

}


exports.showUsers = function (req, res) {

}

/**
 * Remove User from Game
 */

exports.removeUser = function (req, res) {
    var game = req.game;

    if (game.status != 'New') {
        return res.send(new Error("You cannot remove user from running game. Please reset the game."))
    }
    var userId = req.subscriberId;

    if (userId instanceof Array) {
        for (var i = 0; i < userId.length; i++) {
            unsubscribeUser(game, userId[i])

        }
    } else {
        unsubscribeUser(game, userId)
    }
    res.send(game);

}

function subscribeUser(game, userid) {
    Game.subscribeUser(game, userid);
    game.save();
}

function unsubscribeUser(game, userid) {
    Game.unsubscribeUser(game, userid);
    game.save();
}


exports.startGame = function (req, res) {
    var game = req.game;

    if (game.users.length <= 1) {
        return new Error('Not Sufficient users to start a game.')
    }


    Map.getNodes(game.mapId, function (err, nodes) {

        var shuffledNodes = _.shuffle(nodes);

        var nodeStateArray = [];

        for (var i = 0; i < shuffledNodes.length; i++) {

            var nodeState = new NodeState();
            nodeState.nodeId = shuffledNodes[i]._id;
            nodeState.index = shuffledNodes[i].index;
            nodeState.currentUnits = shuffledNodes[i].units;
            nodeState.ownerId = game.users[i % game.users.length]._id;
            nodeStateArray.push(nodeState);
        }

        NodeState.create(nodeStateArray, function (err) {
            if (!err) {
                for (var i = 0; i < nodeStateArray.length; i++) {
                    game.nodesState.addToSet(nodeStateArray[i]);
                }
                // Udpate the Game
                game.status = 'InProgress';
                game.movesLeft = DEFAULT_USER_MOVES;
                game.currentUser = game.users[0];
                game.save(function (err, game) {
                    res.send(game);
                });
            }
        })
    })

}

exports.clearGame = function (req, res) {
    var game = req.game;
    game.nodesState = [];
    game.status = 'New';
    game.save(function (err) {
        if (err) return new Error(err);
        res.send(200, game);
    })


}
/**
 * Delete Game
 */

exports.remove = function (req, res) {

    var game = req.game
    game.remove()

    res.send(200)
}


/**
 *  Show Game
 */

exports.show = function (req, res) {
    var game = req.game

    if (game)
        return res.send(game)
    res.send(404, "Resource not found")
}


/**
 * List of Games. Only for testing purpose. Needs to remove soon.
 * @param req
 * @param res
 */

exports.index = function (req, res) {
    var page = req.param('page') > 0 ? req.param('page') : 0
    var perPage = 15
    var options = {
        perPage: perPage,
        page: page
    }

    Game.list(options, function (err, games) {
        if (err) return res.render('500');
        res.send(games);
    })
}

/**
 * Find Game by id
 */

exports.game = function (req, res, next, id) {
    Game
        .load(id, function (err, game) {
            if (err) return next(err)
            if (!game) return next(new Error('Failed to load Game ' + id))
            req.game = game;
            next();
        })
}

/**
 * Note down subscriber id
 */

exports.subscriber = function (req, res, next, subscriberId) {

    req.subscriberId = subscriberId;
    next();

}