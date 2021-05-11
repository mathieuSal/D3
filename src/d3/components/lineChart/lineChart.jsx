import React, {useEffect} from 'react'
import drawLine from './drawLine'
import './styles/lineChart.scss'

const LineChart = () => {
  useEffect(() => {
    drawLine()
  }, [])

  return (
    <div id="D3Dashboard-LineChart-Container" className="D3Dashboard-LineChart-Container">
    </div>
  )
}

export default LineChart
