import React from 'react'
import PropTypes from 'prop-types'
import Parameter from 'Src/d3/components/pieChart/parameters/parameter'

const Parameters = ({editSetting, settings}) => {
  return (
    <div className="Parameters-Container">
      <div className="Parameter-Color">
        <label>Fill color: </label>
        <input
          type="color"
          value={settings.fill_color}
          onChange={(e) => editSetting('fill_color', e.target.value)}
        />
      </div>
      <div className="Parameter-InnerRadius">
        <Parameter
          label="Inner radius"
          min={0}
          max={100}
          settingLabel={'inner_radius'}
          value={settings.inner_radius}
          editSetting={editSetting}
        />
      </div>
      <div className="Parameter-OuterRadius">
        <Parameter
          label="Outer radius"
          min={0}
          max={100}
          settingLabel={'outer_radius'}
          value={settings.outer_radius}
          editSetting={editSetting}
        />
      </div>
      <div className="Parameter-StartAngle">
        <Parameter
          label="Start angle"
          min={0}
          max={6.2}
          step={0.1}
          settingLabel={'start_angle'}
          value={settings.start_angle}
          editSetting={editSetting}
        />
      </div>
      <div className="Parameter-EndAngle">
        <Parameter
          label="End angle"
          min={0}
          max={6.2}
          step={0.1}
          settingLabel={'end_angle'}
          value={settings.end_angle}
          editSetting={editSetting}
        />
      </div>
      <div className="Parameter-CornerRadius">
        <Parameter
          label="Corner radius"
          min={0}
          max={50}
          settingLabel={'corner_radius'}
          value={settings.corner_radius}
          editSetting={editSetting}
        />
      </div>
      <div className="Parameter-PadAngle">
        <Parameter
          label="Pad angle"
          min={0}
          max={6.2}
          step={0.1}
          settingLabel={'pad_angle'}
          value={settings.pad_angle}
          editSetting={editSetting}
        />
      </div>
    </div>
  )
}
Parameters.propTypes = {
  editSetting: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
}

export default Parameters
