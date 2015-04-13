var resistor = require('../');
var expect = require('chai').expect;

describe('resistor', function() {
  describe('bind', function() {
    it('should bind an empty model definition without errors to "req"', function(done) {
      var middleware = resistor({});
      var req = {};

      middleware(req, {}, function() {
        expect(req.model).to.deep.equal({});

        done();
      })
    });

    it('should bind only values from model definition', function(done) {
      var middleware = resistor({ input : '=' });
      var req = { body : { input : 'value' }};

      middleware(req, {}, function() {
        expect(req.model).to.deep.equal({ input : 'value' });

        done();
      });
    });

    it('should not add validation errors for optional fields', function(done) {
      var middleware = resistor({ input : '=' });
      var req = {};

      middleware(req, {}, function() {
        expect(req.model).to.deep.equal({});

        done();
      });
    });

    it('should add validation errors for required fields', function(done) {
      var middleware = resistor({ input : { type : 'string', required : true }});
      var req = {};

      var res = {
        status : function(status) {
          expect(status).to.equal(400);
          return res;
        },
        json : function(data) {
          expect(data).to.deep.equal({  message : 'Input data is not valid', errors : { input : [{ validator : 'required', value : undefined }]}});
          done();
        }
      };

      middleware(req, res, function() {
        expect.fail();
      });
    });

    it('should add validation errors for required non type converted fields', function(done) {
      var middleware = resistor({ input : { required : true }});
      var req = {};

      var res = {
        status : function(status) {
          expect(status).to.equal(400);
          return res;
        },
        json : function(data) {
          expect(data).to.deep.equal({ message : 'Input data is not valid', errors : { input : [{ validator : 'required', value : undefined }]}});
          done();
        }
      };

      middleware(req, res, function() {
        expect.fail();
      });
    });

    it('should bind date values', function(done) {
      var middleware = resistor({ input : { type : 'date', required : true }});

      var date = new Date();
      var req = { body  : { input : date.toISOString() }};

      middleware(req, {}, function() {
        expect(req.model.input.getTime()).to.equal(date.getTime());

        done();
      });
    });

    /* TODO: This test does currently not work as expected. Something like raw value would be needed and non convertable values must not be copied to target model
    it('should not bind non valid date values', function(done) {
      var middleware = resistor({ input : { type : 'date', required : true }});

      var date = new Date();
      var req = { body  : { input : 'thisisnodate' }};

      middleware(req, {}, function() {
        expect(req.model).to.equal({ errors : {input : [{ validator : 'required', value : null }]}});

        done();
      });
    });
    */

    it('should bind float values', function(done) {
      var middleware = resistor({ input : { type : 'float', required : true }});

      var floatValue = 10.10;
      var req = { body  : { input : floatValue.toString() }};

      middleware(req, {}, function() {
        expect(req.model).to.deep.equal({ input : floatValue });

        done();
      });
    });

    it('should bind int values', function(done) {
      var middleware = resistor({ input : { type : 'int', required : true }});

      var intValue = 10;
      var req = { body  : { input : intValue.toString() }};

      middleware(req, {}, function() {
        expect(req.model).to.deep.equal({ input : intValue });

        done();
      });
    });

    it('should bind boolean values', function(done) {
      var middleware = resistor({ input : { type : 'boolean', required : true }});

      var req = { body  : { input : '1' }};

      middleware(req, {}, function() {
        expect(req.model).to.deep.equal({ input : true });

        done();
      });
    });
  });
});