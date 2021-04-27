import React, { useState } from 'react'
import * as d3 from 'd3'
import './styles/gaugeChart.scss'

const GaugeChart = () => {
  const [settings, setSettings] = useState({
    value: 20,
    min: 0,
    max: 100,
    label: 'label',
    unit: 'unit'
  })

  const editSetting = (parameter, value) => {
    setSettings({
      ...settings,
      [parameter]: value,
    })
  }

  const backgroundArc = d3.arc()
    .innerRadius(0.65)
    .outerRadius(1)
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2)
    .cornerRadius(1)
    ()


  return (
    <div className="D3Dashboard-GaugeChart-Container">
      <svg
        style={{
          border: "1px solid pink"
        }}
        viewBox={[
          -1, -1,
          2, 1,
        ].join(" ")}
        width="9em"
      >
        <path
          d={backgroundArc}
          fill="#dbdbe7"
        />
      </svg>
    </div>
  )
}

export default GaugeChart
