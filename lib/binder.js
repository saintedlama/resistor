var util = require('util');

function Binder() {
  this.fields = [];
}

Binder.prototype.addField = function(name, converter, validators) {
  this.fields.push({
    name: name,
    converter: converter,
    validators: validators || []
  });
};

Binder.prototype.bind = function(sources, options) {
  options = options || {};

  var result = {};

  if (!util.isArray(sources)) {
    sources = [sources];
  }

  for (var i = 0; i < this.fields.length; i++) {
    if (options.includes) {
      // Include filtering! Skip everything that is not included

      if (!containsField(this.fields[i], options.includes)) {
        continue;
      }
    }

    if (containsField(this.fields[i], options.excludes)) {
      continue;
    }

    for (var j = 0; j < sources.length; j++) {
      if (!sources[j]) {
        continue;
      }

      var sourceValue = sources[j][this.fields[i].name];

      if (sourceValue !== undefined) {
        result[this.fields[i].name] = this.fields[i].converter(sourceValue);
      }
    }
  }

// TODO: Move to model.bind!!!
  var validationResult = this.validate(result);

  if (!validationResult.isValid) {
    result.errors = validationResult.errors;
  }

  return result;
};

// TODO: Move to model.bind!!!
Binder.prototype.validate = function(model) {
  return validate(this.fields, model);
};

function containsField(field, fieldNames) {
  if (!fieldNames) {
    return;
  }

  for (var i=0;i<fieldNames.length;i++) {
    if (fieldNames[i] == field.name) {
      return true;
    }
  }

  return false;
}

function validateField(model, field) {
  var value = model[field.name];

  var errors = [];

  for (var l = 0; l < field.validators.length; l++) {
    if (!field.validators[l].validate(value)) {
      errors.push(field.validators[l].name);
    }
  }

  return errors;
}

function validate(fields, model) {
  var errors = {};
  var hasErrors = false;

  for (var i = 0; i < fields.length; i++) {
    var fieldErrors = validateField(model, fields[i]);

    if (fieldErrors.length) {
      errors[fields[i].name] = fieldErrors;
      hasErrors = true;
    }
  }

  return {
    isValid: !hasErrors,
    errors: errors
  };
}

module.exports = Binder;