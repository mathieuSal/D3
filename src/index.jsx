import React from 'react'
import ReactDom from 'react-dom'
import D3Dashboard from './d3/d3Dashboard'

const root = document.getElementById('app')
const App = () => {
  return (
    <D3Dashboard />
  )
}
ReactDom.render(<App />, root)
