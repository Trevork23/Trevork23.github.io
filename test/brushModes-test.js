var vows = require('vows'),
    assert = require('assert'),
    events = require('events'),
    load = require('./load'),
    suite = vows.describe('brushModes');

function d3Parcoords() {
  var promise = new(events.EventEmitter);
  load(function(d3) {
    promise.emit('success', d3.parcoords());
  });
  return promise;
}

suite.addBatch({
  'd3.parcoords': {
    'has by default': {
       topic: d3Parcoords(),
       'three brush modes': function(pc) {
         assert.strictEqual(pc.brushModes().length, 3);
       },
       'the brush mode "None"': function(pc) {
         assert.notStrictEqual(pc.brushModes().indexOf("None"), -1);
       },
       'the brush mode "1D-Axes"': function(pc) {
         assert.notStrictEqual(pc.brushModes().indexOf("1D-Axis"), -1);
       },
       'the brush mode "2D-strums"': function(pc) {
         assert.notStrictEqual(pc.brushModes().indexOf("2D-strums"), -1);
       }
    },
  }
});

suite.export(module);