import React, {useEffect} from 'react'
import drawLine from './drawLine'
import './styles/lineChart.scss'

const LineChart = () => {
  useEffect(() => {
    drawLine()
  }, [])

  return (
    <div id="D3Dashboard-LineChart-Container" className="D3Dashboard-LineChart-Container">
      <div id="tooltip-line-chart" className="tooltip-line-chart">
        <div id="tooltip-line-chart-value" className="tooltip-line-chart-value" />
        <div id="tooltip-line-chart-date"  className="tooltip-line-chart-date" />
      </div>
    </div>
  )
}

export default LineChart
