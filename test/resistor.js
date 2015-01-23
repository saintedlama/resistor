var resistor = require('../');
var expect = require('chai').expect;

describe('resistor', function() {
  describe('model', function() {
    it('should throw if no schema was passed', function(done) {
      try {
        resistor.model();
      } catch (e) {
        done();
      }
    });

    it('should create a model from a schema', function() {
      var UserModel = resistor.model({});

      expect(UserModel).to.exist;
      expect(UserModel).to.be.a('object');
    });

    it('should expose original schema as field', function() {
      var schema = {};
      var UserModel = resistor.model({});

      expect(UserModel.schema).to.exist;
      expect(UserModel.schema).to.deep.equal(schema);
    });

    it('should expose a validate function', function() {
      var UserModel = resistor.model({});

      expect(UserModel.validate).to.exist;
      expect(UserModel.validate).to.be.a('function');
    });

    it('should expose a bind function', function() {
      var UserModel = resistor.model({});

      expect(UserModel.bind).to.exist;
      expect(UserModel.bind).to.be.a('function');
    });

    it('should expose a toObject function', function() {
      var UserModel = resistor.model({});

      expect(UserModel.toObject).to.exist;
      expect(UserModel.toObject).to.be.a('function');
    });

    describe('bind', function() {
      it('should bind fields specified as string assignments', function() {
        var UserModel = resistor.model({
          name: '='
        });

        var user = UserModel.bind({ name : 'hugo' });
        expect(user.name).to.equal('hugo');
      });

      it('should throw if unknown string binding operator is used', function(done) {
        try {
          resistor.model({
            name: '*'
          });
        } catch (e) {
          done();
        }
      });

      it('should throw if unknown type is used', function(done) {
        try {
          resistor.model({
            name: { type : 'hugo' }
          });
        } catch (e) {
          done();
        }
      });

      it('should throw if unknown validator is used', function(done) {
        try {
          resistor.model({
            name: { validateForSomethingExotic : true }
          });
        } catch (e) {
          done();
        }
      });

      it('should bind fields specified as booleans', function() {
        var UserModel = resistor.model({
          name: true // any type allowed
        });

        var user = UserModel.bind({ name : 'hugo' });
        expect(user.name).to.equal('hugo');
      });

      it('should not bind fields for non truthy values', function() {
        var UserModel = resistor.model({
          name: false // any type allowed
        });

        var user = UserModel.bind({ name : 'hugo' });
        expect(user.name).to.not.exist;
      });


      it('should bind fields specified as numbers', function() {
        var UserModel = resistor.model({
          name: 1 // any type allowed
        });

        var user = UserModel.bind({ name : 'hugo' });
        expect(user.name).to.equal('hugo');
      });

      it('should bind input to model fields', function() {
        var UserModel = resistor.model({
          name: {} // any type allowed
        });

        var user = UserModel.bind({ name : 'hugo' });
        expect(user.name).to.equal('hugo');
      });

      it('should bind multiple input sources to model fields', function() {
        var UserModel = resistor.model({
          firstname: true,
          lastname: true
        });

        var user = UserModel.bind([{ firstname : 'hugo' }, { lastname : 'cabret' }]);
        expect(user.firstname).to.equal('hugo');
        expect(user.lastname).to.equal('cabret');
      });

      it('should ignore undefined input sources', function() {
        var UserModel = resistor.model({
          firstname: true,
          lastname: true
        });

        var user = UserModel.bind([{ firstname : 'hugo' }, undefined]);
        expect(user.firstname).to.equal('hugo');
        expect(user.lastname).to.not.exist;
      });

      // TODO: Think about this behavior. Would'nt an empty object be a better idea?
      it('should bind undefined models to undefined', function() {
        var UserModel = resistor.model({
          firstname: true,
          lastname: true
        });

        var user = UserModel.bind(undefined);
        expect(user).to.be.undefined;
      });

      it('should bind multiple input sources', function() {
        var UserModel = resistor.model({
          id: { type: String, required: true },
          name: { type: String, required: false }
        });

        var user = UserModel.bind([{ name : 'hugo' }, { id : 'id' }]);
        expect(user.id).to.equal('id');
        expect(user.name).to.equal('hugo');
      });

      it('should bind "string" types', function() {
        var UserModel = resistor.model({
          id: { type: String, required: true }
        });

        var user = UserModel.bind([{ id : 1 }]);
        expect(user.id).to.equal('1');
      });

      it('should bind "integer" types', function() {
        var UserModel = resistor.model({
          id: { type: 'integer', required: true }
        });

        var user = UserModel.bind([{ id : '1' }]);
        expect(user.id).to.equal(1);
      });

      it('should bind "float" types', function() {
        var UserModel = resistor.model({
          id: { type: 'float', required: true }
        });

        var user = UserModel.bind([{ id : '1.1' }]);
        expect(user.id).to.equal(1.1);
      });

      it('should bind "date" types', function() {
        var now = new Date();

        var UserModel = resistor.model({
          createdAt: { type: 'date', required: true }
        });

        var user = UserModel.bind({ createdAt : now.toISOString() });
        expect(user.createdAt).to.deep.equal(now);
      });


      it('should bind only included fields', function() {
        var UserModel = resistor.model({
          firstname: true,
          lastname: true
        });

        var user = UserModel.bind([{ firstname : 'hugo' }, { lastname : 'cabret' }], { includes : ['firstname'] });
        expect(user.firstname).to.equal('hugo');
        expect(user.lastname).to.not.exist;
      });

      it('should not bind excluded fields', function() {
        var UserModel = resistor.model({
          firstname: true,
          lastname: true
        });

        var user = UserModel.bind([{ firstname : 'hugo' }, { lastname : 'cabret' }], { excludes : ['lastname'] });
        expect(user.firstname).to.equal('hugo');
        expect(user.lastname).to.not.exist;
      });
    });

    describe('toObject', function() {
      it('should convert model to object', function() {
        var UserModel = resistor.model({
          firstname: true,
          lastname: true
        });

        var user = UserModel.toObject([{ firstname : 'hugo' }, { lastname : 'cabret' }], { excludes : ['lastname'] });
        expect(user.firstname).to.equal('hugo');
        expect(user.lastname).to.not.exist;
      });

      it('should not validate when calling toObject', function() {
        var UserModel = resistor.model({
          firstname: { required : false },
          lastname : { required : true }
        });

        var user = UserModel.toObject([{ firstname: 'hugo' }]);
        expect(user.firstname).to.equal('hugo');
        expect(user.lastname).to.not.exist;
      });
    });
  });

  describe('validate', function() {
    it('should validate instances for required fields', function() {
      var UserModel = resistor.model({ id: { type: String, required: true }});

      var valid = UserModel.validate({ id : 'hugo'});

      expect(valid).to.exist;
      expect(valid.isValid).to.be.true;
    });

    it('should validate instances in bind', function() {
      var UserModel = resistor.model({
        firstname: { required : true },
        lastname: { required : true }
      });

      var user = UserModel.bind({ firstname : 'hugo' });
      expect(user.firstname).to.equal('hugo');
      expect(user.errors).to.exist;
      expect(user.errors.lastname).to.exist;
      expect(user.errors.lastname.length).to.equal(1);
      expect(user.errors.lastname[0]).to.equal('required');
    });
  });
});