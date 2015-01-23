var Model = require('./lib/model');
var validators = require('./lib/validators');
var converters = require('./lib/converters');

var resistor = {
  model : function(schema, options) {
    options = options || {};
    options.converters = options.converters || converters;
    options.validators = options.validators || validators;

    return new Model(schema, options);
  },

  validators : validators,
  converters : converters
};

module.exports = resistor;

