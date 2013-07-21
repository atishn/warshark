var mongoose = require('mongoose'),
    assert = require('assert')

var Schema = mongoose.Schema;

var ContainerSchema = new Schema({
    name: String,
})

var MasterSchema = new Schema({
    name: String,
    container: [{type: Schema.Types.ObjectId, ref: 'Container'}]
});

var PanelSchema = new Schema({
    name: String,
    master: [MasterSchema]
});

var AppSchema = new Schema({
    name: String,
    panel: [PanelSchema]
});

var App = mongoose.model('App', AppSchema);
var Panel = mongoose.model('Panel', PanelSchema);
var Master = mongoose.model('Master', MasterSchema);
var Container = mongoose.model('Container', ContainerSchema);

//
var container = new Container({name:'page'});
container.save(function(err) {
    var master = new Master({name:'meester'});
    master.container.push(container);
    master.save(function(err) {
        var panel = new Panel({name:'paneel'});
        panel.master.push(master);
        panel.save(function(err) {
            var app = new App({name:'application'});
            app.panel.push(panel);
            app.save(function(err) {
                App.findOne({name:'application'})
                    .populate('panel.master.container')
                    .exec(function(err, prog) {
                        if (err) throw new Error('not found');
                        assert.equal(prog.panel[0].name, 'paneel');
                        assert.equal(prog.panel[0].master[0].name, 'meester');
                        assert.equal(prog.panel[0].master[0].container[0].name, 'page'); // <== fails
    //                        process.exit();
                    });
            });
        });
    });
});