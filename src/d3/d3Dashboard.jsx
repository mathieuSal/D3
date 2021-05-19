import React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import Row from 'Src/d3/row'
import ColorScaleConverter from 'Src/d3/components/colorScaleConverter/colorScaleConverter'
import PieChart from './components/pieChart/pieChart'
import Transitions from 'Src/d3/components/transitions/transitions'
import BarChart from 'Src/d3/components/barChart/barChart'
import GaugeChart from 'Src/d3/components/gaugeChart/gaugeChart'
import Viewbox from 'Src/d3/components/viewbox/viewbox'
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
        <Row title="tools">
          <div className="row">
            <ColorScaleConverter />
            <Viewbox />
            <Transitions />
          </div>
        </Row>
        <Row title="demo">
          <div className="row">
            <GaugeChart />
            <PieChart />
          </div>
        </Row>
        <Row title="bar chart">
          <div className="row">
            <BarChart />
            <BarChartCustom />
          </div>
        </Row>
        <Row title="line chart">
          <div className="row">
            <LineChart />
          </div>
        </Row>
      </div>
    </ErrorBoundary>
  )
}

export default D3Dashboard
