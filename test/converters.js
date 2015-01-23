var expect = require('chai').expect;
var converters = require('../lib/converters');

describe('converters', function() {
  it('should expose a createConverter function', function() {
    expect(converters.createConverter).to.exist;
    expect(converters.createConverter).to.be.a('function');
  });

  it('should create converters from string names', function() {
    var converter = converters.createConverter('integer');

    expect(converter).to.exist;
    expect(converter).to.be.a('function');
  });

  it('should create converters from types', function() {
    var converter = converters.createConverter(String);

    expect(converter).to.exist;
    expect(converter).to.be.a('function');
  });

  it('should create Identity converter if no converter type is specified', function() {
    var converter = converters.createConverter();
    var identityConverter = converters.identity();

    expect(converter).to.exist;
    expect(converter.toString()).to.deep.equal(identityConverter.toString());
  });

  describe('identity', function() {
    it('should convert values to identical value for identity converter', function() {
      var converter = converters.identity();

      var expected = 'a';
      var actual = converter(expected);

      expect(actual).to.equal(expected);
    });
  });

  describe('string', function() {
    it('should convert number values to strings', function() {
      var converter = converters.string();

      var actual = converter(1);
      expect(actual).to.equal('1');
    });

    it('should convert string values to strings', function() {
      var converter = converters.string();

      var actual = converter('a');
      expect(actual).to.equal('a');
    });
  });

  describe('date', function() {
    it('should convert string values to dates', function() {
      var converter = converters.date();

      var expected = new Date();
      var actual = converter(expected.toISOString());

      expect(actual).to.deep.equal(expected);
    });

    it('should convert date values to dates', function() {
      var converter = converters.date();

      var expected = new Date();

      var actual = converter(expected);
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('integer', function() {
    it('should convert string values to integers', function() {
      var converter = converters.integer();

      var expected = 10;
      var actual = converter('10');

      expect(actual).to.equal(expected);
    });

    it('should convert integer values to integers', function() {
      var converter = converters.integer();

      var expected = 10;

      var actual = converter(expected);
      expect(actual).to.equal(expected);
    });
  });

  describe('float', function() {
    it('should convert string values to floats', function() {
      var converter = converters.float();

      var expected = 10.10;
      var actual = converter('10.10');

      expect(actual).to.equal(expected);
    });

    it('should convert integer values to floats', function() {
      var converter = converters.float();

      var expected = 10.10;

      var actual = converter(expected);
      expect(actual).to.equal(expected);
    });
  });
});