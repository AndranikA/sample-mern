const _isEmpty = require('../utils/is-empty');
const {isEmpty, isEmail} = require('validator');


module.exports = data => {
  const errors = {};
  
  // those are undefined when empty, so we make them strings in order to use validator
  let {email, password} = data;
  email = !_isEmpty(email) ? email : '';
  password = !_isEmpty(password) ? password : '';

  // email validation
  if(!isEmail(email)) {
    errors.email = 'Email is not valid'
  }
  if(isEmpty(email)) {
    errors.email = 'Email is required'
  }

  // password validation
  if(isEmpty(password)) {
    errors.password = 'Password is required'
  }

  return {
    errors,
    isValid: _isEmpty(errors)
  }
}