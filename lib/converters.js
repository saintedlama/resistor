var validator = require('validator');

var converters = {
  default : function() {
    return function(value) {
      return value;
    }
  }
};

/*
Copy sanitizers from node validator
  toString(input)
  toDate(input)
  toFloat(input)
  toInt(input [, radix])
  toBoolean(input [, strict])
  trim(input [, chars])
  ltrim(input [, chars])
  rtrim(input [, chars])
  escape(input)
  stripLow(input [, keep_new_lines])
  whitelist(input, chars)
  blacklist(input, chars)
  normalizeEmail(email [, options])
*/

var sanitizers = ['toString', 'toDate', 'toFloat', 'toInt', 'toBoolean', 'trim', 'ltrim', 'rtrim', 'escape', 'stripLow', 'whitelist', 'blacklist', 'normalizeEmail'];

sanitizers.forEach(function(sanitizer) {
  var converterName = sanitizer.indexOf('to') == 0?sanitizer.substr(2).toLowerCase():sanitizer;

  // TODO: Pass arguments as in validators?
  converters[converterName] = function() { return validator[sanitizer] };
});

module.exports = converters;