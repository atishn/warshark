var mongo = require('mongodb'),
    env = process.env.NODE_ENV || 'development',
    config = require('../../config/config')[env];

var Server = mongo.Server,
    Db = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true});
//var server = new Server(config.db);

db = new Db('maps', server);

db.open(function (err, db) {
    if (!err) {
        console.log("Connected to 'maps' database");
        db.collection('maps', {strict: true}, function (err, collection) {
            if (err) {
                console.log("The 'maps' collection doesn't exist");
            }
        });
    }
});

exports.findByName = function (req, res) {
    var name = req.params.name;
    console.log('Retrieving map: ' + name);
    db.collection('maps', function (err, collection) {
        collection.findOne({'name': name}, function (err, item) {
            res.send(item);
        });
    });
};

exports.addMap = function (req, res) {
    var map = req.body;
    console.log('Adding map: ' + JSON.stringify(map));
    db.collection('maps', function (err, collection) {
        collection.insert(map, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
