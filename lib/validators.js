var validator = require('validator');

var validators = {
  required: function () {
    return function (value) {
      return value;
    }
  }
};

var validatorFunctions = ['equals', 'contains', 'matches', 'isEmail', 'isURL', 'isFQDN', 'isIP', 'isAlpha', 'isNumeric', 'isAlphanumeric',
  'isBase64', 'isHexadecimal', 'isHexColor', 'isLowercase', 'isUppercase', 'isInt', 'isFloat', 'isDivisibleBy', 'isNull', 'isLength',
  'isByteLength', 'isUUID', 'isDate', 'isAfter', 'isBefore', 'isIn', 'isCreditCard', 'isISIN', 'isISBN', 'isMobilePhone', 'isJSON',
  'isMultibyte', 'isAscii', 'isFullWidth', 'isHalfWidth', 'isVariableWidth', 'isSurrogatePair', 'isMongoId', 'isCurrency'];

validatorFunctions.forEach(function(validatorFunction) {
  validators[validatorFunction] = function () {
    var args = Array.prototype.slice.call(arguments);

    return function (value) {
      return validator[validatorFunction].apply(validator, [value].concat(args));
    };
  }
});

module.exports = validators;