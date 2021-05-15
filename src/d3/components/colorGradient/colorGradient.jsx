import React, { useState, useEffect } from 'react'
import drawRect from 'Src/d3/components/colorGradient/drawRect'
import './styles/colorGradient.scss'

const ColorGradient = () => {
  const [params, editParams] = useState({
    range_min: 0,
    range_max: 5000,
    color_min: '#1f77b4',
    color_max: '#15235d'
  })

  useEffect(() => {
    drawRect(params)
  }, [params])

  const editParam = (param, value) => {
    editParams({
      ...params,
      [param]: value
    })
  }

  return (
    <div id="D3Dashboard-ColorGradient-Container" className="D3Dashboard-ColorGradient-Container" >
      <div className="Gradient-Result"/>
      <div className="Gradient-Graph" id="Gradient-Graph"/>
      <div className="Gradient-Range-Min">
        <input
          type="text"
          value={params.range_min}
          style={{"width": "60%"}}
          onChange={(e) => editParam('range_min', e.target.value)}
        />
      </div>
      <div className="Gradient-Range-Max">
        <input
          type="text"
          value={params.range_max}
          style={{"width": "60%"}}
          onChange={(e) => editParam('range_max', e.target.value)}
        />
      </div>
      <div className="Gradient-Color-Min">
        <input
          type="color"
          value={params.color_min}
          onChange={(e) => editParam('color_min', e.target.value)}
        />
      </div>
      <div className="Gradient-Color-Max">
        <input
          type="color"
          value={params.color_max}
          onChange={(e) => editParam('color_max', e.target.value)}
        />
      </div>
    </div>
  )
}

export default ColorGradient
