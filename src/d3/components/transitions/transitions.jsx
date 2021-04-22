import React from 'react'
import * as d3 from 'd3'

const Transitions = () => {
  const runTransition = () => {
    d3.select("#circle")
        .attr("cx", 50)
        .style("fill", "cornflowerblue")
      .transition()
        .delay(500)
        .duration(2000)
        .attr("cx", 500)
      .transition()
        .duration(1000)
        .style("fill", "lavender")
      .transition()
        .duration(1000)
        .attr("cx", 50)
        .style("fill", "cornflowerblue")
  }

  return (
    <>
      <div className="D3Dashboard-Transition-Container">
        <div className="Transition-Container">
          <svg viewBox="0 0 550 100" width="550" height="100">
            <circle id="circle" cx="50" cy="50" r="40" fill="cornflowerblue">
            </circle>
          </svg>
        </div>
        <div className="Parameter-Color-Transition">
          <span>here different transitions for color</span>
        </div>
        <div className="Parameter-Color-Start">
          <span>here the starting color</span>
        </div>
        <div className="Parameter-Color-End">
          <span>here the ending color</span>
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
