import React, { useEffect } from 'react'
import drawRect from 'Src/d3/components/colorGradient/drawRect'
import './styles/colorGradient.scss'

const ColorGradient = () => {

  useEffect(() => {
    drawRect()
  }, [])

  return (
    <div id="D3Dashboard-ColorGradient-Container" className="D3Dashboard-ColorGradient-Container" />
  )
}

export default ColorGradient
