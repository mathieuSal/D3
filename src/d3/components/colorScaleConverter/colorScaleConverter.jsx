import React, {useState, useEffect} from 'react'
import drawColorScaleConverter from 'Src/d3/components/colorScaleConverter/drawColorScaleConverter'
import './styles/colorScaleConverter.scss'

const ColorScaleConverter = () => {
  const [settings, editSettings] = useState({
    domain_min: 1,
    domain_max: 50000,
    color_start: '#1f77b4',
    color_end: '#15235d',
    steps: 50
  })

  useEffect(() => {
    drawColorScaleConverter(settings)
  }, [settings])

  const editSetting = (field, value) => {
    editSettings({
      ...settings,
      [field]: value
    })
  }

  return (
    <div id="D3Dashboard-ColorScaleConverter-Container" className="D3Dashboard-ColorScaleConverter-Container">
      <div className="Converter-Graph-Container">
        <div id="Converter-Graph" className="Converter-Graph" />
        <div id="tooltip-converter" className="tooltip-converter">
          <div id="tooltip-converter-value" className="tooltip-converter-value" />
          <div id="tooltip-converter-color"  className="tooltip-converter-color" />
        </div>
      </div>
      <div className="Converter-Range-Min">
        <input
          type="number"
          value={settings.domain_min}
          min="1"
          style={{"width": "60%"}}
          onChange={(e) => editSetting('domain_min', e.target.value)}
        />
      </div>
      <div className="Converter-Range-Max">
        <input
          type="number"
          value={settings.domain_max}
          style={{"width": "60%"}}
          onChange={(e) => editSetting('domain_max', e.target.value)}
        />
      </div>
      <div className="Converter-Color-Start">
        <input
          type="color"
          value={settings.color_start}
          onChange={(e) => editSetting('color_start', e.target.value)}
        />
      </div>
      <div className="Converter-Color-End">
        <input
          type="color"
          value={settings.color_end}
          onChange={(e) => editSetting('color_end', e.target.value)}
        />
      </div>
      <div className="Converter-Steps">
        <input
          type="number"
          value={settings.steps}
          onChange={(e) => editSetting('steps', e.target.value)}
        />
      </div>
    </div>
  )
}

export default ColorScaleConverter
