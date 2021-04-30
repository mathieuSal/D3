import React, { useEffect } from 'react'
import drawBars from 'Src/d3/components/barChart/drawBars'
import './styles/barChart.scss'

const BarChart = () => {
  useEffect(() => {
    drawBars()
  }, [])

  return (
    <div id="D3Dashboard-BarChart-Container" className="D3Dashboard-BarChart-Container">
      <div id="tooltip" className="tooltip">
        <div className="tooltip-range" id="range" />
        <div className="tooltip-examples" id="examples" />
        <div className="tooltip-value">
          ...of <span id="count" /> tasks
        </div>
        <div className="tooltip-bar-value">
          <b><span id="tooltip-bar-value" />%</b>
          of the work was done by developers
        </div>
        <div className="tooltip-bar">
          <div className="tooltip-bar-fill" id="tooltip-bar-fill" />
        </div>
      </div>
    </div>
  )
}

export default BarChart
