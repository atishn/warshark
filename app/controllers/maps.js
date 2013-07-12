var mongoose = require('mongoose')
    , Map = mongoose.model('Map')

/**
 * Create Node
 */

exports.create = function (req, res) {
    var map = new Map(req.body)
    map.save(function (err) {
        if (err) {
            console.log(err);
            res.send(500, map);
        }
        res.send(201, map);
    })
}


/**
 * Update Node
 */

exports.update = function (req, res) {

    var reqMap = new Map(req.body);
    var map = req.map;
    if (map) {
        map.name = reqMap.name;

    } else
        map = reqMap;
    map.save(function (err) {
        if (err) {
            console.log(err);
            res.send(500, map);
        }
        res.send(map);
    })
}


/**
 * Delete Node
 */

exports.remove = function (req, res) {

    var map = req.map
    map.remove()

    res.send(200)
}


/**
 *  Show Node
 */

exports.show = function (req, res) {
    var map = req.map
    res.send(map)
}


/**
 * Find node by id
 */

exports.map = function (req, res, next, id) {
    Map
        .findOne({ _id: id })
        .exec(function (err, map) {
            if (err) return next(err)
            if (!map) return next(new Error('Failed to load User ' + id))
            req.map = map
            next()
        })
}

/**
 * Find node by name
 */

exports.findByName = function (req, res, next, name) {
    Map
        .findOne({ name: name })
        .exec(function (err, map) {
            if (err || !map) return new Error('Failed to load Map ' + name)
            req.map = map
            next()
        })
}


//
//
//env = process.env.NODE_ENV || 'development',
//    config = require('../../config/config')[env];
//
//var Server = mongo.Server,
//    Db = mongo.Db;
//
//var server = new Server('localhost', 27017, {auto_reconnect: true});
////var server = new Server(config.db);
//
//db = new Db('maps', server);
//
//db.open(function (err, db) {
//    if (!err) {
//        console.log("Connected to 'maps' database");
//        db.collection('maps', {strict: true}, function (err, collection) {
//            if (err) {
//                console.log("The 'maps' collection doesn't exist");
//            }
//        });
//    }
//});
//
//exports.findByName = function (req, res) {
//    var name = req.params.name;
//    console.log('Retrieving map: ' + name);
//    db.collection('maps', function (err, collection) {
//        collection.findOne({'name': name}, function (err, item) {
//            res.send(item);
//        });
//    });
//};
//
//exports.addMap = function (req, res) {
//    var map = req.body;
//    console.log('Adding map: ' + JSON.stringify(map));
//    db.collection('maps', function (err, collection) {
//        collection.insert(map, {safe: true}, function (err, result) {
//            if (err) {
//                res.send({'error': 'An error has occurred'});
//            } else {
//                console.log('Success: ' + JSON.stringify(result[0]));
//                res.send(result[0]);
//            }
//        });
//    });
//}
