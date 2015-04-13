var builder = require('./lib/builder');

module.exports = function (model, options) {
  options = options || {};
  options.bindingSources = options.bindingSources || bindingSourceBody;
  options.errorHandler = options.errorHandler || jsonErrorHandler;

  var binder = builder(model, options);

  return function (req, res, next) {
    req.model = binder.bind(options.bindingSources(req, res));

    if (req.model.errors) {
      return options.errorHandler(req, res, options, next);
    }

    next();
  }
};

module.exports.converters = require('./lib/converters');
module.exports.validators = require('./lib/validators');

module.exports.bindingSources = {
  body : bindingSourceBody,
  query :bindingSourceQuery,
  params : bindingSourceParams,
  all : bindingSourceAll
};

function bindingSourceBody(req) {
  return req.body;
}

function bindingSourceQuery(req) {
  return req.query;
}

function bindingSourceParams(req) {
  return req.params;
}

function bindingSourceAll(req) {
  return [bindingSourceQuery(req), bindingSourceBody(req), bindingSourceParams(req)];
}

function jsonErrorHandler(req, res) {
  res
    .status(400)
    .json({
      message: 'Input data is not valid',
      errors: req.model.errors
    });
}