var resistor = require('../');
var expect = require('chai').expect;

describe('resistor', function() {
  it('should bind selected fields', function() {
    var repo = {
      "_id" : "5444f4af2e02d05424ada0f1",
      "name" : "bumm",
      "htmlUrl" : "https://github.com/saintedlama/bumm",
      "description" : "Opinionated project generator for node.js relying on express and mongoose. The bumm repository moved to https://github.com/the-diamond-dogs-group-oss/bumm",
      "cloneUrl" : "https://github.com/saintedlama/bumm.git",
        "__v" : 0
    };

    var transform = resistor.transformer({
      name : resistor.bind,
      htmlUrl : resistor.bind,
      description : resistor.bind, // TODO: Bind or assign or copy or clone?
      cloneUrl : resistor.bind
    });

    var transformedRepo = transform(repo);

    expect(transformedRepo).to.deep.equal({
      "name" : "bumm",
      "htmlUrl" : "https://github.com/saintedlama/bumm",
      "description" : "Opinionated project generator for node.js relying on express and mongoose. The bumm repository moved to https://github.com/the-diamond-dogs-group-oss/bumm",
      "cloneUrl" : "https://github.com/saintedlama/bumm.git"
    });
  });

  it('should bind fields with custom bind function', function() {
    var repo = {
      "name" : "bumm"
    };

    var transform = resistor.transformer({
      name : function(value) { return 'bound-' + value; }
    });

    var transformedRepo = transform(repo);

    expect(transformedRepo).to.deep.equal({
      "name" : "bound-bumm"
    });
  });
});