var mongoose = require('mongoose')
    , async = require('async')
    , Game = mongoose.model('Game')
    , Map = mongoose.model('Map')
    , Region = mongoose.model('Region')
    , Node = mongoose.model('Node')
    , NodeState = mongoose.model('NodeState')
    , User = mongoose.model('User')
    , UserGame = mongoose.model('UserGame')


exports.populate = function (req, res) {

    var NODES_PER_REGION_COUNT = 5;
    var REGION_PER_MAP_COUNT = 2;

    // Create Nodes
    var nodes = [];

    for (var i = 1; i <= REGION_PER_MAP_COUNT; i++) {
        for (var j = 1; j <= NODES_PER_REGION_COUNT; j++) {

            var node = new Node();
            node.index = (i - 1) * NODES_PER_REGION_COUNT + j;
            node.color = j;
            node.units = getRandomNodeUnits();
            node.coordinates.x = i;
            node.coordinates.y = j;
            nodes.push(node);
        }
    }

    for (var i = 1; i <= nodes.length; i++) {
        if (i + 1 <= nodes.length) {
            if (i % NODES_PER_REGION_COUNT != 0) {
                addNeighbor(nodes, i - 1, i);
            }
            if (i + NODES_PER_REGION_COUNT <= nodes.length) {
                addNeighbor(nodes, i - 1, i + NODES_PER_REGION_COUNT - 1);
            }
        }
    }

    var regions = []
    for (var i = 1; i <= REGION_PER_MAP_COUNT; i++) {
        var region = new Region();

        region.name = "region" + i;
        region.unitBonus = getRandomBonusUnits();
        region.color = getRandomColor();
        regions.push(region);

    }

    var mapName = req.mapName;
    var map = new Map();
    map.name = mapName;

    for (var i = 0; i < regions.length; i++) {
        var start = i * NODES_PER_REGION_COUNT;
        var end = start + NODES_PER_REGION_COUNT;

        for (var index = start; index < end; index++) {
            regions[i].node.push(nodes[index]);
        }
        map.region.push(regions[i]);
    }

    var game = new Game();
    game.name = "Game_" + mapName;
    game.mapId = map;
    game.users.push("51ddbcedaa9be60000000002");  // Wicks
    game.users.push("51fd2269c0e13251a0000002");  // Atish
    game.users.push("5204cc38beb9ad0000000002");  // Rob
    game.users.push("5204cc7ebeb9ad0000000004");  // Cho

    async.waterfall([
        function (cb) {
            Node.create(nodes, function (err) {
                cb()
            })
        },
        function (cb) {
            Region.create(regions, function (err) {
                cb();
            })
        },
        function (cb) {
            map.save(cb)
        },
        function (cb) {
            game.save(function () {
                res.send(game);
            })
        }

    ], function (err, status) {
        console.log(status);
        res.send(game);
    })
}

function addNeighbor(nodes, first, second) {
    nodes[first].neighbors.addToSet(nodes[second]._id);
    nodes[second].neighbors.addToSet(nodes[first]._id);
}

function getRandomColor() {
    var colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Pink', 'Brown', 'Black', 'Grey', 'White' ];

    var color = colors[Math.floor(Math.random() * colors.length)];
    return color;
}


function getRandomNodeUnits() {
    return getRandomInt(3, 5);
}

function getRandomBonusUnits() {
    return getRandomInt(4, 10);
}
/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Find Map by id
 */

exports.db = function (req, res, next, name) {
    req.mapName = name;
    next()
}