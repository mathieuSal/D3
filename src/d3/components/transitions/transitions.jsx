import React, { useState, useEffect } from 'react'
import * as d3 from 'd3'

const Transitions = () => {
  const [transitionSettings, setTransitionSettings] = useState({
    color_start: '#1f77b4',
    color_end: '#ff7f0e',
    start_angle: 0,
    end_angle: 6.3,
    pad_angle: 0,
    corner_radius: 20,
    fill_color: '#e0e0e0',
    value: '[60, 40]',
  })

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
        .attr("cx", 50)
        .style("fill", transitionSettings.color_start)
      .transition()
        .delay(500)
        .duration(2000)
        .attr("cx", 500)
      .transition()
        .duration(1000)
        .style("fill", transitionSettings.color_end)
      .transition()
        .duration(1000)
        .attr("cx", 50)
        .style("fill", transitionSettings.color_start)
  }

  return (
    <>
      <div className="D3Dashboard-Transition-Container">
        <div className="Transition-Container">
          <svg viewBox="0 0 550 100" width="550" height="100">
            <circle id="circle" cx="50" cy="50" r="40" fill={transitionSettings.color_start}>
            </circle>
          </svg>
        </div>
        <div className="Parameter-Color-Transition">
          <span>here different transitions for color</span>
        </div>
        <div className="Parameter-Color-Start">
          <input
            type="color"
            value={transitionSettings.color_start}
            onChange={(e) => editSetting('color_start', e.target.value)}
          />
        </div>
        <div className="Parameter-Color-End">
          <input
            type="color"
            value={transitionSettings.color_end}
            onChange={(e) => editSetting('color_end', e.target.value)}
          />
        </div>
        <div className="Parameter-Transition">
          <span>here different transitions</span>
        </div>
        <div className="Parameter-Run">
          <button onClick={runTransition}>Run</button>
        </div>
      </div>
    </>
  )
}

export default Transitions
