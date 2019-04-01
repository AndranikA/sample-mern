import React from 'react';
import PropTypes from 'prop-types';

const TextFieldGroup = ({name, placeholder, value, label, error, info, type, onChange, disabled}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={"form-control form-control-lg" + (error ? " is-invalid": "")}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <small className="form-text text-danger">{error}</small>}
    </div>
  )
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: 'text',
};

export default TextFieldGroup;