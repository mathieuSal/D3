import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Parameter = ({ editSetting, settingLabel, value, min, max, label, step }) => {
  return (
    <>
      <label>{label}</label>
      <Slider
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={(value) => editSetting(settingLabel, value)}
      />
    </>
  )
}

Parameter.propTypes = {
  editSetting: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  settingLabel: PropTypes.string.isRequired,
  step: PropTypes.number,
}

Parameter.defaultProps = {
  step: 1,
}

export default Parameter
