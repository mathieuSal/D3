import React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import PieChart from './components/pieChart/pieChart'
import Transitions from 'Src/d3/components/transitions/transitions'
import BarChart from 'Src/d3/components/barChart/barChart'
import GaugeChart from 'Src/d3/components/gaugeChart/gaugeChart'
import Viewbox from 'Src/d3/components/viewbox/viewbox'
import ColorGradient from 'Src/d3/components/colorGradient/colorGradient'
import BarChartCustom from 'Src/d3/components/barChartCustom/barChartCustom'
import LineChart from 'Src/d3/components/lineChart/lineChart'
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
        <div className="row">
          <PieChart />
          <Transitions />
          <BarChart />
        </div>
        <div className="row">
          <GaugeChart />
          <Viewbox />
          <BarChartCustom />
        </div>
        <div className="row">
          <LineChart />
          <ColorGradient />
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default D3Dashboard
