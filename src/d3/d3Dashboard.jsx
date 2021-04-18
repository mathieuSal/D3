import React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import * as d3 from "d3";
import './styles/d3Dashboard.scss'

const D3Dashboard = () => {
  function ErrorFallback({error, resetErrorBoundary}) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    )
  }
  const arcPathGenerator = d3.arc()
    .innerRadius(18)
    .outerRadius(40)
    .startAngle(0)
    .endAngle(5.5)
    .padAngle(0)
    .cornerRadius(20)
  const arcPath = arcPathGenerator()
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
    >
      <div className="D3Dashboard-Container">
        <svg width="100" height="100">
          <path
            fill="cornflowerblue"
            d={arcPath}
            style={{"transform": "translate(50%, 50%)"}}
          />
        </svg>
      </div>
    </ErrorBoundary>
  )
}

export default D3Dashboard
