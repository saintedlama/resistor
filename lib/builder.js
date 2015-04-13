var util = require('util');

var converters = require('./converters');
var validators = require('./validators');

var Binder = require('./binder');

module.exports = function(model, options) {
  if (!model) { throw new Error('Model argument is required'); }

  options = options || {};
  options.converters = options.converters || converters;
  options.validators  = options.validators || validators;

  var fields = [];

  // TODO: Accept a function for "type" (as converter)!!!
  // TODO: Need a readonly flag to make values bound only once!
  for (var key in model) {
    if (model.hasOwnProperty(key)) {
      var fieldDefinition = model[key];

      fields.push(buildField(key, fieldDefinition, options));
    }
  }

  return new Binder(fields);
};

function buildField(key, fieldDefinition, options) {
  var converter = buildConverter(fieldDefinition.type, options.converters);

  if (typeof fieldDefinition == 'string') {
    switch (fieldDefinition) {
      case '=':
        return { name : key, converter : converter, validators : [] };
        break;
      default:
        throw new Error(util.format('Model is invalid. Field binding "%s" is unknown. Use "=" for assignment bindings.', fieldDefinition))
    }
  }

  if (typeof fieldDefinition == 'object') {
    var fieldValidators = [];

    for (var validatorKey in fieldDefinition) {
      if (fieldDefinition.hasOwnProperty(validatorKey)) {

        if (validatorKey == 'type') {
          continue;
        }

        var validator = options.validators[validatorKey];

        if (!validator) {
          throw new Error(util.format('Model is invalid. Validator "%s" is unknown. Register validators using resistor.validators object', validatorKey));
        }

        fieldValidators.push({ name : validatorKey, validate : validator(fieldDefinition[validatorKey]) });
      }
    }

    return { name : key, converter : converter, validators : fieldValidators };
  }

  if (fieldDefinition) { // Something truthy - add a simple mapping field binder
    return { name : key, converter : converter, validators : [] };
  }
}

function buildConverter(type, converters) {
  if (!type) {
    return buildConverter('default', converters);
  }

  var converter = converters[type];

  if (!converter) {
    throw new Error(util.format('Model is invalid. Converter "%s" is unknown. Register converters using resistor.converters object', type));
  }

  // TODO: Where to pass converter options
  return converter();
}