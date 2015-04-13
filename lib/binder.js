var util = require('util');

function Binder(fields) {
  this.fields = fields || [];
}

Binder.prototype.bind = function(sources, options) {
  options = options || {};

  if (!util.isArray(sources)) {
    sources = [sources];
  }

  var result = this.convert(sources, options);
  var validationResult = this.validate(result);

  if (!validationResult.isValid) {
    result.errors = validationResult.errors;
  }

  // TODO: Implement a mapping stage!!!

  return result;
};

Binder.prototype.convert = function(sources, options) {
  var result = {};

  for (var i = 0; i < this.fields.length; i++) {
    if (options.includes) {
      // Include filtering! Skip everything that is not included

      if (!containsField(this.fields[i], options.includes)) {
        continue;
      }
    }

    // Exclude filtering! Skip everything that is excluded
    if (containsField(this.fields[i], options.excludes)) {
      continue;
    }

    for (var j = 0; j < sources.length; j++) {
      if (!sources[j]) {
        continue;
      }

      var sourceValue = sources[j][this.fields[i].name];

      if (sourceValue !== undefined) {
        var convertedValue = this.fields[i].converter(sourceValue);

        if (convertedValue !== null && convertedValue !== undefined) {
          result[this.fields[i].name] = convertedValue;
        }
      }
    }
  }

  return result;
};

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

function validate(fields, model) {
  var errors = {};
  var hasErrors = false;

  for (var i = 0; i < fields.length; i++) {
    var fieldErrors = validateField(model, fields[i]);

    if (fieldErrors && fieldErrors.length) {
      errors[fields[i].name] = fieldErrors;
      hasErrors = true;
    }
  }

  return {
    isValid: !hasErrors,
    errors: errors
  };
}

function validateField(model, field) {
  if (!field.validators) {
    return;
  }

  var value = model[field.name];

  var errors = [];

  for (var l = 0; l < field.validators.length; l++) {
    if (!field.validators[l].validate(value)) {
      errors.push({ validator : field.validators[l].name, value : value });
    }
  }

  return errors;
}

module.exports = Binder;