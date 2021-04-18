import React from 'react'
import PropTypes from 'prop-types'

const Parameters = ({editSetting, settings}) => {
  return (
    <>
      <p>
        <label>Fill color: </label>
        <input
          type="color"
          value={settings.fill_color}
          onChange={(e) => editSetting('fill_color', e.target.value)}
        />
      </p>
    </>
  )
}
Parameters.propTypes = {
  editSetting: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
}

export default Parameters
