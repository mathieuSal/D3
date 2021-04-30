import React, { useEffect } from 'react'
import drawBars from 'Src/d3/components/barChartCustom/drawBars'
import './styles/barChartCustom.scss'

const BarChartCustom = () => {
  useEffect(() => {
    drawBars()
  }, [])

  return (
    <div id="D3Dashboard-BarChartCustom-Container" className="D3Dashboard-BarChartCustom-Container"/>
  )
}

export default BarChartCustom
