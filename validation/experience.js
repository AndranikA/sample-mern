const _isEmpty = require('../utils/is-empty');
const {isEmpty} = require('validator');


module.exports = data => {
  const errors = {};

  // those are undefined when empty, so we make them strings in order to use validator
  let {title, company, from} = data;
  title = !_isEmpty(title) ? title : '';
  company = !_isEmpty(company) ? company : '';
  from = !_isEmpty(from) ? from : '';

  // title validation
  if(isEmpty(title)) {
    errors.title = 'Title is required'
  }

  // company validation
  if(isEmpty(company)) {
    errors.company = 'Company is required'
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