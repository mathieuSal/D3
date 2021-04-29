import React, { useState } from 'react'
import * as d3 from 'd3'
import Parameter from 'Src/d3/components/generic/parameter/parameter'
import { getCoordsOnArc } from 'Src/d3/d3Utility'
import './styles/gaugeChart.scss'

const GaugeChart = () => {
  const [settings, setSettings] = useState({
    value: 20,
    min: 0,
    max: 100,
    color: '#4834d4',
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
    .range(["#dbdbe7", settings.color])

  const gradientSteps = colorScale.ticks(10)
    .map(value => colorScale(value))

  const markerLocation = getCoordsOnArc(
    angle,
    1 - ((1 - 0.65) / 2),
  )

  return (
    <div className="D3Dashboard-GaugeChart-Container">
      <div className="Gauge-Container">
        <div className="Gauge">
          <svg
            viewBox={[
              -1, -1,
              2, 1,
            ].join(" ")}
            style={{
              "overflow": "visible"
            }}
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
            <circle
              cx={markerLocation[0]}
              cy={markerLocation[1]}
              r="0.2"
              stroke="#2c3e50"
              strokeWidth="0.01"
              fill={colorScale(percent)}
            />
            <path
              d="M0.136364 0.0290102C0.158279 -0.0096701 0.219156 -0.00967009 0.241071 0.0290102C0.297078 0.120023 0.375 0.263367 0.375 0.324801C0.375 0.422639 0.292208 0.5 0.1875 0.5C0.0852272 0.5 -1.8346e-08 0.422639 -9.79274e-09 0.324801C0.00243506 0.263367 0.0803571 0.120023 0.136364 0.0290102ZM0.1875 0.381684C0.221591 0.381684 0.248377 0.356655 0.248377 0.324801C0.248377 0.292947 0.221591 0.267918 0.1875 0.267918C0.153409 0.267918 0.126623 0.292947 0.126623 0.324801C0.126623 0.356655 0.155844 0.381684 0.1875 0.381684Z"
              transform={`rotate(${
                angle * (180 / Math.PI)
              }) translate(-0.2, -0.33)`}
              fill="#6a6a85"
            />
          </svg>
          <div style={{
            marginTop: "0.4em",
            fontSize: "3em",
            lineHeight: "1em",
            fontWeight: "900",
          }}>
            { d3.format(",")(settings.value) }
          </div>
          {!!settings.label && (
            <div style={{
              color: "#8b8ba7",
              marginTop: "0.6em",
              fontSize: "1.3em",
              lineHeight: "1.3em",
              fontWeight: "700",
            }}>
              { settings.label }
            </div>
          )}
          {!!settings.unit && (
            <div style={{
              color: "#8b8ba7",
              lineHeight: "1.3em",
              fontWeight: "300",
            }}>
              { settings.unit }
            </div>
          )}
        </div>
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
        <div className="Parameter-Inputs-Color">
          <label>Color: </label>
          <input
            type="color"
            value={settings.color}
            onChange={(e) => editSetting('color', e.target.value)}
          />
        </div>
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
