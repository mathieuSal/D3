import React, { useState, useEffect } from 'react'
import * as d3 from 'd3'
import './styles/transitions.scss'

const Transitions = () => {
  const [transitionSettings, setTransitionSettings] = useState({
    color_start: '#1f77b4',
    color_end: '#ff7f0e',
    ease_color: 'easeQuadIn',
    ease: 'easeLinear',
    duration: 1000
  })

  const TRANSITION_OPTIONS = [
    'easeLinear',
    'easeQuadIn',
    'easeQuadOut',
    'easeQuad',
    'easeExpIn',
    'easeExpOut',
    'easeExp',

  ]

  const editSetting = (parameter, value) => {
    setTransitionSettings({
      ...transitionSettings,
      [parameter]: value,
    })
  }

  useEffect(() => {
    document.getElementById('circle').removeAttribute('style')
  }, [transitionSettings.color_start])


  const runTransition = () => {
    d3.select("#circle")
        .attr("cy", 50)
        .style("fill", transitionSettings.color_start)
      .transition()
        .duration(transitionSettings.duration)
        .ease(d3[transitionSettings.ease])
        .attr("cy", 450)
      .transition()
        .duration(1000)
        .ease(d3[transitionSettings.ease_color])
        .style("fill", transitionSettings.color_end)
      .transition()
        .duration(transitionSettings.duration)
        .ease(d3[transitionSettings.ease])
        .attr("cy", 50)
      .transition()
        .duration(1000)
        .ease(d3[transitionSettings.ease_color])
        .style("fill", transitionSettings.color_start)
  }

  return (
    <>
      <div className="D3Dashboard-Transition-Container">
        <div className="Transition-Container">
          <svg viewBox="0 0 100 550" width="100" height="450">
            <circle id="circle" cx="50" cy="50" r="40" fill={transitionSettings.color_start}>
            </circle>
          </svg>
        </div>
        <div className="Parameter-Color-Transition">
          <select
            name="ease-color-select"
            id="ease-color-select"
            value={transitionSettings.ease_color}
            onChange={(e) => editSetting('ease_color', e.target.value)}
          >
            { TRANSITION_OPTIONS.map((option, i) => {
              return (
                <option
                  key={`ease-color-select-${i}`}
                  value={option}
                >
                  {option}
                </option>
              )
            })}
          </select>
        </div>
        <div className="Parameter-Color-Picker">
          <input
            type="color"
            value={transitionSettings.color_start}
            onChange={(e) => editSetting('color_start', e.target.value)}
          />
          <input
            type="color"
            value={transitionSettings.color_end}
            onChange={(e) => editSetting('color_end', e.target.value)}
          />
        </div>
        <div className="Parameter-Transition">
          <select
            name="ease-select"
            id="ease-select"
            value={transitionSettings.ease}
            onChange={(e) => editSetting('ease', e.target.value)}
          >
            { TRANSITION_OPTIONS.map((option, i) => {
              return (
                <option key={`ease-select-${i}`} value={option}>{option}</option>
              )
            })}
          </select>
          <input
            type="number"
            min={500}
            value={transitionSettings.duration}
            onChange={(e) => editSetting('duration', e.target.value)}
          />
        </div>
        <div className="Parameter-Run">
          <button onClick={runTransition}>Run</button>
        </div>
      </div>
    </>
  )
}

export default Transitions
