var resistor = require('../');
var expect = require('chai').expect;

describe('bind', function() {
  it('should expose middleware functionality', function() {
    var middleware = resistor({});
    expect(middleware).to.be.a.function;
  });

  it('should copy string mapped values from request body to model values', function(done) {
    var middleware = resistor({ name : '=' });

    var req = { body : { name : 'express' }};
    var res = {};

    middleware(req, res, function() {
      expect(req.model).to.exist;
      expect(req.model.errors).to.not.exist;

      expect(req.model.name).to.equal('express');

      done();
    });
  });

  it('should copy fields with value conversion from request body to model values', function(done) {
    var middleware = resistor({ name : { type : 'string' }});

    var req = { body : { name : 'express' }};
    var res = {};

    middleware(req, res, function() {
      expect(req.model).to.exist;
      expect(req.model.errors).to.not.exist;

      expect(req.model.name).to.equal('express');

      done();
    });
  });
});