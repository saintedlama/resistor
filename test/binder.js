var Binder = require('../lib/binder');
var expect = require('chai').expect;

describe('binder', function() {
  it('should bind an empty object for an empty model', function() {
    var binder = new Binder();

    var result = binder.bind({});

    expect(result).to.exist;
    expect(result).to.deep.equal({});
  });

  it('should bind using supplied converter', function() {
    var binder = new Binder([{ name : 'input', converter : function(value) { return value; }, validators : [] }]);

    var result = binder.bind({ input : 'value' });

    expect(result.input).to.equal('value');
  });

  it('should bind when no validators where supplied', function() {
    var binder = new Binder([{ name : 'input', converter : function(value) { return value; } }]);

    var result = binder.bind({ input : 'value' });

    expect(result.input).to.equal('value');
  });
});