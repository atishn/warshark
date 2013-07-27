var mongoose = require('mongoose')
    , Map = mongoose.model('Map')
    , Region = mongoose.model('Region')
    , Node = mongoose.model('Node')

/**
 * Create Map
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
 * Update Map
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

    if (map)
        res.send(map)
    else
        res.send(404, "Resource not found")
}


/**
 * List of Maps.
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

    Map.list(options, function (err, maps) {
        if (err) return res.render('500');
        res.send(maps);
    })
}

/**
 * Find Map by id
 */

exports.map = function (req, res, next, id) {

    Map
        .load(id, function (err, map) {
            if (err) return next(err)
            if (!map) return next(new Error('Failed to load Map ' + id))
            req.map = map;

            next();
        })
}

/**
 * Add Region
 * @param req
 * @param res
 */

exports.addRegion = function (req, res) {

    var map = req.map;
    var region = new Region(req.body)

    region.save(function (err) {
        if (err) {
            console.log(err);
            res.send(500, region);
        }
        map.region.push(region)
        map.save()
        res.send(201, region)
    })
}


/**
 * Remove Region
 * @param req
 * @param res
 */

exports.removeRegion = function (req, res) {

    var map = req.map;
    var region = req.region;

    map.region.pull(region);
    region.remove();

    map.save(function (err) {
        if (err) {
            console.log(err);
            res.send(500);
        }
        res.send(200)
    })
}
