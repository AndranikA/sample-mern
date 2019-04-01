import React from 'react';
import PropTypes from 'prop-types';

const InputGroup = ({name, placeholder, value, icon, type, error, onChange}) => {
  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon}></i>
        </span>
      </div>
      <input
        className={"form-control form-control-lg" + (error ? " is-invalid": "")}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <small className="form-text text-danger">{error}</small>}
    </div>
  )
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
InputGroup.defaultProps = {
  type: 'text',
};

export default InputGroup;