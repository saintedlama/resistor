var converters = {
  identity : function(options) {
    return function(value) {
      return value;
    }
  },
  string : function(options) {
    return function(value) {
      return String(value);
    }
  },

  date : function(options) {
    return function(value) {
      return new Date(value);
    }
  },

  integer : function(options) {
    return function(value) {
      return parseInt(value, 10);
    }
  },

  float : function(options) {
    return function (value) {
      if(/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
          .test(value))
        return Number(value);
      return NaN;
    }
  },

  createConverter : function(type) {
    if (!type) {
      return converters.identity();
    }

    var converterName;
    if (typeof type == 'string') {
      converterName = type;
    } else {
      converterName = type.name.toLowerCase();
    }

    // TODO: How to pass conversion options???
    return converters[converterName]();
  }
};

module.exports = converters;