import React from 'react';
import PropTypes from 'prop-types';

const TextareaFieldGroup = ({name, placeholder, value, error, info, onChange}) => {
  return (
    <div className="form-group">
      <textarea
        className={"form-control form-control-lg" + (error ? " is-invalid": "")}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <small className="form-text text-danger">{error}</small>}
    </div>
  )
};

TextareaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextareaFieldGroup;