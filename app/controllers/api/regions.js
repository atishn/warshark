var mongoose = require('mongoose')
    , Region = mongoose.model('Region')
    , Node = mongoose.model('Node')


/**
 * Create Region
 */

exports.create = function (req, res) {
    var region = new Region(req.body)
    region.save(function (err) {
        if (err) {
            return  res.send(500, err);

        }
        res.send(201, region);
    })
}


/**
 * Update Region
 */

exports.update = function (req, res) {

    var regionNode = new Region(req.body);

    var region = req.region;
    if (region) {
        region.name = regionNode.name;
        region.color = regionNode.color;
        region.unitBonus = regionNode.unitBonus,
            region.nodeCount = regionNode.nodeCount
    } else region = regionNode;

    region.save(function (err) {
        if (err) {
            return res.send(500, err);


        }
        res.send(region);
    })
}


/**
 * Delete Node
 */

exports.remove = function (req, res) {

    var region = req.region
    region.remove()

    res.send(200)
}


/**
 * List of nodes.
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

    Region.list(options, function (err, regions) {
        if (err) {
            return  res.render('500', err);
        }
        res.send(regions);
    })
}

/**
 * Add Node
 * @param req
 * @param res
 */

exports.addNode = function (req, res) {

    var region = req.region;
    var node = new Node(req.body)
    node.save(function (err) {
        if (err) {
            return res.send(500, err);
        }
        region.node.push(node)
        region.save()
        res.send(201, node)
    })
}


/**
 * Remove Node
 * @param req
 * @param res
 */

exports.removeNode = function (req, res) {

    var region = req.region;
    var node = req.node;

    region.node.pull(node._id);

    node.save(function (err) {
        if (err) {
            console.log(err);
            return res.send(500, err);
        }
        res.send(200, region)
    })
}

/**
 * List Node
 * @param req
 * @param res
 */

exports.node = function (req, res) {

    var region = req.region;
    res.send(region.node);
}


/**
 *  Show Node
 */

exports.show = function (req, res) {
    var region = req.region
    res.send(region)
}

/**
 * Find node by id
 */

exports.region = function (req, res, next, id) {
    Region
        .load(id, function (err, region) {
            if (err) return next(err)
            if (!region) return next(new Error('Failed to load Region ' + id))
            req.region = region
            next()
        })
}

