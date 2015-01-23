var Benchmark = require('benchmark');
var benchmarks = require('beautify-benchmark');
var suite = new Benchmark.Suite('Resistor.model.bind');

var resistor = require('../');

var UserModel = resistor.model({
  name: true // any type allowed
});

var bindingSource = { name : 'hugo' };

suite.add('model.bind', function() {
  var boundUser = UserModel.bind(bindingSource);
}).add('purejs', function() {
  if (bindingSource) {
    var boundUser = { name : bindingSource.name };
  }
}).on('cycle', function(event) {
  benchmarks.add(event.target);
}).on('complete', function() {
  benchmarks.log();
}).run({ 'async': true });