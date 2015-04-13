var converters = require('../lib/converters');
var expect = require('chai').expect;

describe('converters', function() {
  it('should expose generation function for default', function() {
    expect(converters.default).to.be.a('function');
    expect(converters.default()).to.be.a('function');
  });

  it('should return values for default converter', function() {
    var convertedValue = converters.default()('value');

    expect(convertedValue).to.equal('value');
  });

  it('should expose node validator sanitizers', function() {
    var sanitizers = ['string', 'date', 'float', 'int', 'boolean', 'trim', 'ltrim', 'rtrim', 'escape', 'stripLow',
      'whitelist', 'blacklist', 'normalizeEmail'];

    sanitizers.forEach(function(sanitizer) {
      expect(converters[sanitizer]).to.be.a('function');
      expect(converters[sanitizer]()).to.be.a('function');
    });
  });
});