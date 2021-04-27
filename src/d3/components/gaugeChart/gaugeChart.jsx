import React, { useState } from 'react'
import * as d3 from 'd3'
import Parameter from 'Src/d3/components/generic/parameter/parameter'
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

  const percentScale = d3.scaleLinear()
    .domain([settings.min, settings.max])
    .range([0, 1])
  const percent = percentScale(settings.value)

  const angleScale = d3.scaleLinear()
    .domain([0, 1])
    .range([-Math.PI / 2, Math.PI / 2])
    .clamp(true)
  const angle = angleScale(percent)

  const filledArc = d3.arc()
    .innerRadius(0.65)
    .outerRadius(1)
    .startAngle(-Math.PI / 2)
    .endAngle(angle)
    .cornerRadius(1)
    ()

  const colorScale = d3.scaleLinear()
    .domain([0, 1])
    .range(["#dbdbe7", "#4834d4"])

  const gradientSteps = colorScale.ticks(10)
    .map(value => colorScale(value))

  return (
    <div className="D3Dashboard-GaugeChart-Container">
      <div className="Gauge">
        <svg
          viewBox={[
            -1, -1,
            2, 1,
          ].join(" ")}
          width="9em"
        >
          <defs>
            <linearGradient
              id="Gauge__gradient"
              gradientUnits="userSpaceOnUse"
              x1="-1"
              x2="1"
              y2="0">
              {gradientSteps.map((color, index) => (
                <stop
                  key={color}
                  stopColor={color}
                  offset={`${
                    index
                    / (gradientSteps.length - 1)
                  }`}
                />
              ))}
            </linearGradient>
          </defs>
          <path
            d={backgroundArc}
            fill="#dbdbe7"
          />
          <path
            d={filledArc}
            fill="url(#Gauge__gradient)"
          />
          <line
            y1="-1"
            y2="-0.65"
            stroke="white"
            strokeWidth="0.027"
          />
        </svg>
      </div>
      <div className="Parameter-Sliders">
        <Parameter
          label="Value"
          max={settings.max}
          settingLabel="value"
          value={settings.value}
          min={settings.min}
          editSetting={editSetting}
        />
        <Parameter
          label="Min"
          max={200}
          settingLabel="min"
          value={settings.min}
          min={0}
          editSetting={editSetting}
        />
        <Parameter
          label="Max"
          max={200}
          settingLabel="max"
          value={settings.max}
          min={0}
          editSetting={editSetting}
        />
      </div>
      <div className="Parameter-Inputs">
        <div className="Parameter-Inputs-Label">
          <label>Label: </label>
          <input
            type="text"
            value={settings.label}
            onChange={(e) => editSetting('label', e.target.value)}
          />
        </div>
        <div className="Parameter-Inputs-Unit">
          <label>Unit: </label>
          <input
            type="text"
            value={settings.unit}
            onChange={(e) => editSetting('unit', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default GaugeChart
