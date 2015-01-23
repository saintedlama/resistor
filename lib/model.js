var util = require('util');

var Binder = require('./binder');

function Model(schema, options) {
  if (!schema) { throw new Error('Schema argument is required'); }

  this.schema = schema;

  var binder = new Binder();

  // TODO: Support array schema too!
  for (var key in schema) {
    if (schema.hasOwnProperty(key)) {
      var fieldDefinition = schema[key];

      if (typeof fieldDefinition == 'string') {
        switch (fieldDefinition) {
          case '=':
            binder.addField(key, options.converters.createConverter(), []);
            break;
          default:
            throw new Error(util.format('Schema is invalid. Field binding "%s" is unknown. Use "=" for assignment bindings.', fieldDefinition))
        }
      } else if (typeof fieldDefinition == 'object') {
        var fieldValidators = [];

        for (var validatorKey in fieldDefinition) {
          if (fieldDefinition.hasOwnProperty(validatorKey)) {

            if (validatorKey == 'type') {
              continue;
            }

            var validator = options.validators[validatorKey];

            if (!validator) {
              throw new Error(util.format('Schema is invalid. Validator "%s" is unknown. Register validators using resistor.validators object', validatorKey));
            }

            fieldValidators.push({ name : validatorKey, validate : validator(fieldDefinition[validatorKey]) });
          }
        }

        binder.addField(key, options.converters.createConverter(fieldDefinition.type), fieldValidators);
      } else if (fieldDefinition) { // Something truthy - add a simple mapping field binder
        binder.addField(key, options.converters.createConverter(), []);
      }
    }
  }

  this.binder = binder;
}

// TODO: Add a mixin option to mixin model methods
Model.prototype.bind = function(models, options) {
  if (models === undefined) {
    return;
  }

  return this.binder.bind(models, options);
};

Model.prototype.validate = function(model, options) {
  if (model === undefined) {
    return;
  }

  return this.binder.validate(model, options);
};

Model.prototype.toObject = function(model, options) {
  if (model === undefined) {
    return;
  }

  return this.binder.toObject(model, options);
};

module.exports = Model;