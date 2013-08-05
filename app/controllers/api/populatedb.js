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

    var NODES_REGION_COUNT = 10;
    var mapName = req.mapName;
    var map = new Map();
    map.name = mapName;
    //map.save();

    var regions = []
    for (var i = 1; i <= 15; i++) {
        var region = new Region();

        region.name = "region" + i;
        region.unitBonus = getRandomBonusUnits();
        region.color = getRandomColor();
        regions.push(region);
    }

    // Create Nodes
    var nodes = [];

    for (var i = 1; i <= regions.length; i++) {
        for (var j = 1; j <= NODES_REGION_COUNT; j++) {
            var node = new Node();
            node.index = (i - 1) * 10 + j;
            node.units = getRandomNodeUnits();
            node.coordinates.x = i * 10;
            node.coordinates.y = j * 10;
            nodes.push(node);
        }
    }

    res.send(200);

//
//    Region.create(regions, function (err, regions) {
//        for (var i = 0; i < regions.length; i++) {
//            map.region.push(regions[i]);
//        }
//        map.save();
//
//        // Create Nodes
//        var nodes = [];
//        for (var i = 1; i <= regions.length(); i++) {
//            for (var j = 1; j <= NODES_REGION_COUNT; j++) {
//                var node = new Node();
//                node.index = (i - 1) * 10 + j;
//                node.units = getRandomNodeUnits();
//                node.coordinates.x = i * 10;
//                node.coordinates.y = j * 10;
//                nodes.push(node);
//            }
//        }

//            units: Number,
//                coordinates: {
//                x: {type: Number},
//                y: {type: Number}
//            },
//            neighbors: [
//                { type: String}
//    })
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
    req.gamename = name;
    next()
}