
/**
 *  Show Home
 */

exports.home = function (req, res) {
    var games = require('../../public/mock/game-list.json');
    res.render('game/home', {
        games: games
    });
}

/**
 *  Show Mapmaker
 */

exports.mapmaker = function (req, res) {
    res.render('game/map-maker');
}

/**
 *  Retrieve specific game
 */

exports.game = function (req, res) {
    res.render('game/game', {
        id: req.params.id
    });
}


