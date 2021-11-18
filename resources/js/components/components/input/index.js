import React from 'react'
import PropTypes from 'prop-types';

const CustomInput = (props) => {
  const {type, value, onChange, className} = props
  return(
    <input type={type} value={value} onChange={onChange} className={`bg-white border border-bray-200 border-gray-400 h-12 h-14 p-3 rounded-md w-full ${className}`} />
  )
}


CustomInput.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

CustomInput.defaultProps = {
  type: 'text'
};

export default CustomInput