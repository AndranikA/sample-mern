const _isEmpty = require('../utils/is-empty');
//const validator = require('validator');
const {isLength, isEmpty, isEmail, matches, equals} = require('validator');
// const isLength = require('validator/lib/isLength');
// const isEmpty = require('validator/lib/isEmpty');
// const isEmail = require('validator/lib/isEmail');
// const matches = require('validator/lib/matches');
// const equals = require('validator/lib/equals');

module.exports = data => {
  const errors = {};
  
  // those are undefined when empty, so we make them strings in order to use validator
  let {name, email, password, password2} = data;
  name = !_isEmpty(name) ? name : '';
  email = !_isEmpty(email) ? email : '';
  password = !_isEmpty(password) ? password : '';
  password2 = !_isEmpty(password2) ? password2 : '';

  // name validation
  if(!isLength(name, {min: 2, max: 30})) {
    errors.name = 'Name must be beetwin 2 and 30 characters'
  }
  if(isEmpty(name)) {
    errors.name = 'Name is required'
  }

  // email validation
  if(!isEmail(email)) {
    errors.email = 'Email is not valid'
  }
  if(isEmpty(email)) {
    errors.email = 'Email is required'
  }

  // password validation
  if(!matches(password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/)) {
    errors.password = 'Please follow the password requirments'
  }
  if(isEmpty(password)) {
    errors.password = 'Password is required'
  }

  // retype password validation
  if(!equals(password, password2)) {
    errors.password2 = 'Passwords must match'
  }
  if(isEmpty(password2)) {
    errors.password2 = 'Confirm passwords is required'
  }

  return {
    errors,
    isValid: _isEmpty(errors)
  }
};