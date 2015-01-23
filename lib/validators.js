module.exports = {
  required: function(isRequired) {
    if (isRequired) {
      return function(fieldValue) {
        return fieldValue !== undefined && fieldValue !== null;
      };
    }

    return function() {
      return true;
    };
  }
}