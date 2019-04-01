const _isEmpty = require('../utils/is-empty');
const {isLength, isEmpty} = require('validator');

module.exports = data => {
  const errors = {};

  // those are undefined when empty, so we make them strings in order to use validator
  let {text} = data;
  text = !_isEmpty(text) ? text : '';

  // text validation
  if(!isLength(text, {min: 10, max: 300})) {
    errors.text = 'Text must be beetwin 10 and 300 characters'
  }
  if(isEmpty(text)) {
    errors.text = 'Text is required'
  }

  return {
    errors,
    isValid: _isEmpty(errors)
  }
};