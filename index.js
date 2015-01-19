var util = require('util');


module.exports = {
  transformer : function(schema) {
    return function(model, cb) {
      var transformation = {};

      for (var key in schema) {
        if (!schema.hasOwnProperty(key)) {
          continue;
        }

        var value = model[key];

        if (typeof schema[key] == 'function') {
          transformation[key] = schema[key](value, key);
        } else {
          // TODO: What else?
        }
      }

      if (cb) {
        return cb(null, transformation);
      }

      return transformation;
    }
  },

  bind : function(value, field) {
    return value;
  }
};

