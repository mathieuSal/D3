import React, {useState, useMemo} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import PieChart from './components/pieChart/pieChart'
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
      <PieChart />
    </ErrorBoundary>
  )
}

export default D3Dashboard
