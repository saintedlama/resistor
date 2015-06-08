var resistor = require('../');
var expect = require('chai').expect;

describe('validators', function() {
  /*


  */

  it('should implement node-validator "equals" function', function() {
    var binder = resistor.binder({ value : { equals : [1] }});

    var result = binder.bind({ value : 1 });

    expect(result).to.deep.equal({ value : 1 });
  });

  it('should implement node-validator "contains" function', function() {
    var binder = resistor.binder({ value : { contains : 'abc' }});

    var result = binder.bind({ value : '0abcdefg' });

    expect(result).to.deep.equal({ value : '0abcdefg' });
  });

  it('should implement node-validator "matches" function', function() {
    var binder = resistor.binder({ value : { matches : /^abc$/i}});

    var result = binder.bind({ value : 'abc' });

    expect(result).to.deep.equal({ value : 'abc' });
  });

  it('should implement node-validator "isEmail" function', function() {
    var binder = resistor.binder({ value : { isEmail : true }});

    var result = binder.bind({ value : 'nomail@please.com' });

    expect(result).to.deep.equal({ value : 'nomail@please.com' });
  });

  it('should implement node-validator "isURL" function', function() {
    var binder = resistor.binder({ value : { isURL : true }});

    var result = binder.bind({ value : 'http://localhost' });

    expect(result).to.deep.equal({ value : 'http://localhost' });
  });

  it('should implement node-validator "isFQDN" function', function() {
    var binder = resistor.binder({ value : { isFQDN : true }});

    var result = binder.bind({ value : 'www.localhost.com' });

    expect(result).to.deep.equal({ value : 'www.localhost.com' });
  });

  it('should implement node-validator "isIP" function', function() {
    var binder = resistor.binder({ value : { isIP : true }});

    var result = binder.bind({ value : '127.0.0.1' });

    expect(result).to.deep.equal({ value : '127.0.0.1' });
  });

  it('should implement node-validator "isAlpha" function', function() {
    var binder = resistor.binder({ value : { isAlpha : true }});

    var result = binder.bind({ value : 'abcdefg' });

    expect(result).to.deep.equal({ value : 'abcdefg' });
  });

  it('should implement node-validator "isNumeric" function', function() {
    var binder = resistor.binder({ value : { isNumeric: true }});

    var result = binder.bind({ value : '0234341333' });

    expect(result).to.deep.equal({ value : '0234341333' });
  });

  it('should implement node-validator "isAlphanumeric" function', function() {
    var binder = resistor.binder({ value : { isAlphanumeric: true }});

    var result = binder.bind({ value : 'abc0345345' });

    expect(result).to.deep.equal({ value : 'abc0345345' });
  });

  it('should implement node-validator "isBase64" function', function() {
    var binder = resistor.binder({ value : { isBase64: true }});

    var result = binder.bind({ value : 'dGVzdA==' });

    expect(result).to.deep.equal({ value : 'dGVzdA==' });
  });

  it('should implement node-validator "isHexadecimal" function', function() {
    var binder = resistor.binder({ value : { isHexadecimal: true }});

    var result = binder.bind({ value : '05abcdef0012' });

    expect(result).to.deep.equal({ value : '05abcdef0012' });
  });

  it('should implement node-validator "isHexColor" function', function() {
    var binder = resistor.binder({ value : { isHexColor: true }});

    var result = binder.bind({ value : '#aabb00' });

    expect(result).to.deep.equal({ value : '#aabb00' });
  });

  it('should implement node-validator "isLowercase" function', function() {
    var binder = resistor.binder({ value : { isLowercase: true }});

    var result = binder.bind({ value : 'abdsfsdflkdsf87' });

    expect(result).to.deep.equal({ value : 'abdsfsdflkdsf87' });
  });

  it('should implement node-validator "isUppercase" function', function() {
    var binder = resistor.binder({ value : { isUppercase: true }});

    var result = binder.bind({ value : 'ASDDFDGTRNZUKIDSDSFWEF' });

    expect(result).to.deep.equal({ value : 'ASDDFDGTRNZUKIDSDSFWEF' });
  });

  it('should implement node-validator "isInt" function', function() {
    var binder = resistor.binder({ value : { isInt: true }});

    var result = binder.bind({ value : '324324' });

    expect(result).to.deep.equal({ value : '324324' });
  });

  it('should implement node-validator "isFloat" function', function() {
    var binder = resistor.binder({ value : { isFloat: true }});

    var result = binder.bind({ value : '10.40' });

    expect(result).to.deep.equal({ value : '10.40' });
  });

  it('should implement node-validator "isDivisibleBy" function', function() {
    var binder = resistor.binder({ value : { isDivisibleBy: [2] }});

    var result = binder.bind({ value : '4' });

    expect(result).to.deep.equal({ value : '4' });
  });

  it('should implement node-validator "isNull" function', function() {
    var binder = resistor.binder({ value : { isNull: true }});

    var result = binder.bind({ value : null });

    // In case of a null value nothing is converted
    expect(result).to.deep.equal({ });
  });

  it('should implement node-validator "isLength" function', function() {
    var binder = resistor.binder({ value : { isLength: [4] }});

    var result = binder.bind({ value : 'abcd' });

    expect(result).to.deep.equal({ value : 'abcd' });
  });

  it('should implement node-validator "isByteLength" function', function() {
    var binder = resistor.binder({ value : { isByteLength: [4] }});

    var result = binder.bind({ value : '0123' });

    expect(result).to.deep.equal({ value : '0123' });
  });

  it('should implement node-validator "isUUID" function', function() {
    var binder = resistor.binder({ value : { isUUID: [4] }});

    var result = binder.bind({ value : '2685f910-1f58-4c80-8cab-2629587e6f1e' });

    expect(result).to.deep.equal({ value : '2685f910-1f58-4c80-8cab-2629587e6f1e' });
  });

  it('should implement node-validator "isDate" function', function() {
    var binder = resistor.binder({ value : { isDate: true }});
var date = new Date().toString();

    var result = binder.bind({ value : date });

    expect(result).to.deep.equal({ value : date });
  });

  it('should implement node-validator "isAfter" function', function() {
    var before = new Date(2015, 01, 01).toString();
    var after = new Date(2015, 01, 02).toString();

    var binder = resistor.binder({ value : { isAfter: [before] }});


    var result = binder.bind({ value : after });

    expect(result).to.deep.equal({ value : after});
  });

  it('should implement node-validator "isBefore" function', function() {
    var before = new Date(2015, 01, 01).toString();
    var after = new Date(2015, 01, 02).toString();

    var binder = resistor.binder({ value : { isBefore: [after] }});


    var result = binder.bind({ value : before });

    expect(result).to.deep.equal({ value : before });
  });

  it('should implement node-validator "isCreditCard" function', function() {
    var binder = resistor.binder({ value : { isCreditCard: true }});

    var result = binder.bind({ value : '378282246310005' });

    expect(result).to.deep.equal({ value : '378282246310005' });
  });

  it('should implement node-validator "isISIN" function', function() {
    var binder = resistor.binder({ value : { isISIN: true }});

    var result = binder.bind({ value : 'US0378331005' });

    expect(result).to.deep.equal({ value : 'US0378331005' });
  });

  it('should implement node-validator "isISBN" function', function() {
    var binder = resistor.binder({ value : { isISBN: true }});

    var result = binder.bind({ value : '978-0321125217' });

    expect(result).to.deep.equal({ value : '978-0321125217' });
  });

  it('should implement node-validator "isMobilePhone" function', function() {
    var binder = resistor.binder({ value : { isMobilePhone: ['en-US'] }});

    var result = binder.bind({ value : '+15673628910' });

    expect(result).to.deep.equal({ value : '+15673628910' });
  });

  it('should implement node-validator "isJSON" function', function() {
    var binder = resistor.binder({ value : { isJSON: true }});

    var result = binder.bind({ value : '{ "value" : 1 }' });

    expect(result).to.deep.equal({ value : '{ "value" : 1 }' });
  });

  it('should implement node-validator "isMultibyte" function', function() {
    var binder = resistor.binder({ value : { isMultibyte: true }});

    var result = binder.bind({ value : 'Ö' });

    expect(result).to.deep.equal({ value : 'Ö' });
  });

  it('should implement node-validator "isAscii" function', function() {
    var binder = resistor.binder({ value : { isAscii: true }});

    var result = binder.bind({ value : 'abcz01' });

    expect(result).to.deep.equal({ value : 'abcz01' });
  });

  it('should implement node-validator "isFullWidth" function', function() {
    var binder = resistor.binder({ value : { isFullWidth: true }});

    var result = binder.bind({ value : 'ひらがな・カタカナ、．漢字' });

    expect(result).to.deep.equal({ value : 'ひらがな・カタカナ、．漢字' });
  });

  it('should implement node-validator "isHalfWidth" function', function() {
    var binder = resistor.binder({ value : { isHalfWidth: true }});

    var result = binder.bind({ value : 'j' });

    expect(result).to.deep.equal({ value : 'j' });
  });

  it('should implement node-validator "isVariableWidth" function', function() {
    var binder = resistor.binder({ value : { isVariableWidth: true }});

    var result = binder.bind({ value : 'ひらがなカタカナ漢字ABCDE' });

    expect(result).to.deep.equal({ value : 'ひらがなカタカナ漢字ABCDE' });
  });

  it('should implement node-validator "isSurrogatePair" function', function() {
    var binder = resistor.binder({ value : { isSurrogatePair: true }});

    var result = binder.bind({ value : '𠮷野𠮷'});

    expect(result).to.deep.equal({ value : '𠮷野𠮷'});
  });

  it('should implement node-validator "isMongoId" function', function() {
    var binder = resistor.binder({ value : { isMongoId: true }});

    var result = binder.bind({ value : '55435080b581d340230a53e1' });

    expect(result).to.deep.equal({ value : '55435080b581d340230a53e1' });
  });

  it('should implement node-validator "isCurrency" function', function() {
    var binder = resistor.binder({ value : { isCurrency: true }});

    var result = binder.bind({ value : '-$10,123.45' });

    expect(result).to.deep.equal({ value : '-$10,123.45' });
  });
});