import React, {useState} from 'react'
import Parameter from 'Src/d3/components/generic/parameter/parameter'
import './styles/viewbox.scss'

const Viewbox = () => {
  const [settings, setSettings] = useState({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  })

  const editSetting = (parameter, value) => {
    setSettings({
      ...settings,
      [parameter]: value,
    })
  }
  const {x, y, width, height} = settings
  return (
    <div className="D3Dashboard-Viewbox-Container">
      <div className="Viewbox">
        <svg
          viewBox={`${x} ${y} ${width} ${height}`}
          width="100"
          height="100"
          style={{
            border: "1px solid #cdcece"
          }}
        >
          <circle cx="50" cy="50" r="40" fill="#ff7f0e" />
          <rect width="100" height="100" fill="none" stroke="#ff7f0e" />
        </svg>
      </div>
      <div className="Parameter Parameter-x">
        <Parameter
          label="x"
          min={-100}
          max={100}
          settingLabel={'x'}
          value={settings.x}
          editSetting={editSetting}
        />
      </div>
      <div className="Parameter Parameter-y">
        <Parameter
          label="y"
          min={-100}
          max={100}
          settingLabel={'y'}
          value={settings.y}
          editSetting={editSetting}
        />
      </div>
      <div className="Parameter Parameter-width">
        <Parameter
          label="width"
          min={0}
          max={300}
          settingLabel={'width'}
          value={settings.width}
          editSetting={editSetting}
        />
      </div>
      <div className="Parameter Parameter-height">
        <Parameter
          label="height"
          min={0}
          max={300}
          settingLabel={'height'}
          value={settings.height}
          editSetting={editSetting}
        />
      </div>
    </div>
  )
}

export default Viewbox
