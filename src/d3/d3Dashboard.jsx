import React, {useState, useMemo} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import PieChart from './components/pieChart/pieChart'
import Transitions from 'Src/d3/components/transitions/transitions'
import BarChart from 'Src/d3/components/barChart/barChart'
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

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
    >
      <div className="D3Dashboard">
        <PieChart />
        <Transitions />
        <BarChart />
      </div>
    </ErrorBoundary>
  )
}

export default D3Dashboard
