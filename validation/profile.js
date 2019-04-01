const _isEmpty = require('../utils/is-empty');
//const validator = require('validator');
const {isLength, isEmpty, isURL} = require('validator');

module.exports = data => {
  const errors = {};

  // those are undefined when empty, so we make them strings in order to use validator
  let {handle, status, skills} = data;
  handle = !_isEmpty(handle) ? handle : '';
  status = !_isEmpty(status) ? status : '';
  skills = !_isEmpty(skills) ? skills : '';

  // handle validation
  if(!isLength(handle, {min: 2, max: 30})) {
    errors.handle = 'Handle must be beetwin 2 and 30 characters'
  }
  if(isEmpty(handle)) {
    errors.handle = 'Profile handle is required'
  }

  // status validation
  if(isEmpty(status)) {
    errors.status = 'Status is required'
  }

  // skills validation
  if(isEmpty(skills)) {
    errors.skills = 'Skills is required'
  }

  // validate urls if not empty
  const {website, youtube, twitter, facebook, linkedin, instagram} = data;

  function validateURL(url, name) {
    if(!_isEmpty(url)) {
      if (!isURL(url)) {
        errors[name] = 'Invalid url address'
      }
    }
  }
  validateURL(website, 'website');
  validateURL(youtube, 'youtube');
  validateURL(twitter, 'twitter');
  validateURL(facebook, 'facebook');
  validateURL(linkedin, 'linkedin');
  validateURL(instagram, 'instagram');

  return {
    errors,
    isValid: _isEmpty(errors)
  }
};