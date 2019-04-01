const _isEmpty = require('../utils/is-empty');
const {isEmpty} = require('validator');


module.exports = data => {
  const errors = {};

  // those are undefined when empty, so we make them strings in order to use validator
  let {school, degree, fieldofstudy, from} = data;
  school = !_isEmpty(school) ? school : '';
  degree = !_isEmpty(degree) ? degree : '';
  fieldofstudy = !_isEmpty(fieldofstudy) ? fieldofstudy : '';
  from = !_isEmpty(from) ? from : '';

  // title school
  if(isEmpty(school)) {
    errors.school = 'Title is required'
  }

  // company degree
  if(isEmpty(degree)) {
    errors.degree = 'Company is required'
  }

  // company fieldofstudy
  if(isEmpty(fieldofstudy)) {
    errors.fieldofstudy = 'Company is required'
  }

  // from validation
  if(isEmpty(from)) {
    errors.from = 'From is required'
  }

  return {
    errors,
    isValid: _isEmpty(errors)
  }
};