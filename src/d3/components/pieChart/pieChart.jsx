import React, {useState, useMemo} from 'react'
import * as d3 from 'd3'
import Parameters from './parameters'

const PieChart = () => {
  const [pieSettings, setPieSettings] = useState({
    inner_radius: 18,
    outer_radius: 40,
    start_angle: 0,
    end_angle: 5.5,
    pad_angle: 0,
    corner_radius: 20,
    fill_color: '#34ab34',
  })

  const editSetting = (parameter, value) => {
    setPieSettings({
      ...pieSettings,
      [parameter]: value,
    })
  }

  const arcPath = useMemo(() => {
    const arcPathGenerator = d3.arc()
      .innerRadius(pieSettings.inner_radius)
      .outerRadius(pieSettings.outer_radius)
      .startAngle(pieSettings.start_angle)
      .endAngle(pieSettings.end_angle)
      .padAngle(pieSettings.pad_angle)
      .cornerRadius(pieSettings.corner_radius)

    return arcPathGenerator()
  }, [pieSettings])

  return (
    <>
      <div className="D3Dashboard-Container">
        <Parameters settings={pieSettings} editSetting={editSetting}/>
        <svg width="100" height="100">
          <path
            fill={pieSettings.fill_color}
            d={arcPath}
            style={{"transform": "translate(50%, 50%)"}}
          />
        </svg>
      </div>
    </>
  )
}

export default PieChart
