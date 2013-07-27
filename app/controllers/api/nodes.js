var mongoose = require('mongoose')
    , Node = mongoose.model('Node')


/**
 * Create Node
 */

exports.create = function (req, res) {
    var node = new Node(req.body)
    node.save(function (err) {
        if (err) {
            console.log(err);
            res.send(500, node);
        }
        res.send(201, node);
    })
}


/**
 * Update Node
 */

exports.update = function (req, res) {

    var reqNode = new Node(req.body);

    var node = req.node;
    if (node) {
        node.name = reqNode.name;
        node.color = reqNode.color;
        node.units = reqNode.units;
        node.coordinates = reqNode.coordinates;

    } else node = reqNode;

    node.save(function (err) {
        if (err) {
            console.log(err);
            res.send(500, node);
        }
        res.send(node);
    })
}


/**
 * Delete Node
 */

exports.remove = function (req, res) {

    var node = req.node
    node.remove()

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

    Node.list(options, function (err, articles) {
        if (err) return res.render('500');
        res.send(articles);
    })
}

/**
 * Add Neighbor
 * @param req
 * @param res
 */

exports.addNeighbors = function (req, res) {

    var node = req.node;
    var neighborIds = req.body.id;

    if (neighborIds instanceof Array) {
        for (var i = 0; i < neighborIds.length; i++) {
            addNeighborId(node, neighborIds[i])

        }
    } else {
        addNeighborId(node, neighborIds)
    }
    res.send(node);
}


function addNeighborId(node, neighborId) {

    node.neighbors.addToSet(neighborId);

    // Update the neighbor node also with current node is as a neighbor.
    Node
        .findOne({ _id: neighborId })
        .exec(function (err, neighborNode) {
            if (err) return
            if (!neighborNode) return
            neighborNode.neighbors.addToSet(node._id)
            neighborNode.save()
            node.save();
        })
}
/**
 * Remove Neighbor
 * @param req
 * @param res
 */

exports.removeNeighbor = function (req, res) {
    var node = req.node;
    var neighborNode = req.neighborNode;

    // Removing the references of neighbor nodes.
    node.neighbors.pull(neighborNode._id);
    neighborNode.neighbors.pull(node._id);

    node.save();
    neighborNode.save();

    res.send(node);
}


/**
 *  Show Node
 */

exports.show = function (req, res) {
    var node = req.node
    res.send(node)
}

/**
 * Find node by id
 */

exports.node = function (req, res, next, id) {
    Node
        .findOne({ _id: id })
        .exec(function (err, node) {
            if (err) return next(err)
            if (!node) return next(new Error('Failed to load Node ' + id))
            req.node = node
            next()
        })
}

/**
 * Find node by neighborId
 */

exports.neighborNode = function (req, res, next, id) {
    Node
        .findOne({ _id: id })
        .exec(function (err, node) {
            if (err) return next(err)
            if (!node) return next(new Error('Failed to load User ' + id))
            req.neighborNode = node
            next()
        })
}


