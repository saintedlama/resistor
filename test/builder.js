var builder = require('../lib/builder');
var expect = require('chai').expect;

describe('builder', function() {
  it('should build a binder from an empty object', function() {
    var binder = builder({});

    expect(binder).to.exist;
    expect(binder.bind).to.be.a('function');
  });

  it('should build a binder for a string definition', function() {
    var binder = builder({ name : '=' });

    expect(binder).to.exist;
    expect(binder.bind).to.be.a('function');
  });

  it('should build a binder for a object definiton', function() {
    var binder = builder({ name : { type : 'string' }});

    expect(binder).to.exist;
    expect(binder.bind).to.be.a('function');
  });

  it('should build a binder with a field for an object definiton', function() {
    var binder = builder({ name : { type : 'string' }});

    expect(binder.fields.length).to.equal(1);

    expect(binder.fields[0].name).to.equal('name');
    expect(binder.fields[0].converter).to.exist;
    expect(binder.fields[0].converter).to.be.a('function');
    expect(binder.fields[0].validators).to.deep.equal([]);
  });
});