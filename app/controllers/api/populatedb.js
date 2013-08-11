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
    var DEFAULT_REGION_PER_MAP_COUNT = 2;
    var DEFAULT_NODES_PER_REGION_COUNT = 5;

    var regionCount = req.query.regionCount ? req.query.regionCount * 1 : DEFAULT_REGION_PER_MAP_COUNT;
    var nodeCount = req.query.nodeCount ? req.query.nodeCount * 1 : DEFAULT_NODES_PER_REGION_COUNT;

    // Create Nodes
    var nodes = [];

    for (var i = 1; i <= regionCount; i++) {
        for (var j = 1; j <= nodeCount; j++) {

            var node = new Node();
            node.index = (i - 1) * nodeCount + j;
            node.color = j;
            node.units = getRandomNodeUnits();
            node.coordinates.x = i;
            node.coordinates.y = j;
            nodes.push(node);
        }
    }

    for (var i = 1; i <= nodes.length; i++) {
        if (i + 1 <= nodes.length) {
            if (i % nodeCount != 0) {
                addNeighbor(nodes, i - 1, i);
            }
            if (i + nodeCount <= nodes.length) {
                addNeighbor(nodes, i - 1, i + nodeCount - 1);
            }
        }
    }

    var regions = []
    for (var i = 1; i <= regionCount; i++) {
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
        var start = i * nodeCount;
        var end = start + nodeCount;

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
                cb(err)
            })
        },
        function (cb) {
            Region.create(regions, function (err) {
                cb(err);
            })
        },
        function (cb) {
            map.save(cb)
        },
        function (cb) {
            game.save(function (err, game) {
                if (err) return cb(err)
                return res.send(game);
            })
        }
    ], function (err) {
        if (err) return res.send(err);
        return res.send(game);
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