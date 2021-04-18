import React from 'react'
import ReactDom from 'react-dom'
const root = document.getElementById('app')
const App = () => {
  return (
    <h1>Hello from React</h1>
  )
}
ReactDom.render(<App />, root)
