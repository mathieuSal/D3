import React, {useState, useMemo} from 'react'
import * as d3 from 'd3'
import Parameters from './parameters/parameters'

const PieChart = () => {
  const [pieSettings, setPieSettings] = useState({
    inner_radius: 85,
    outer_radius: 95,
    start_angle: 0,
    end_angle: 6.3,
    pad_angle: 0,
    corner_radius: 20,
    fill_color: '#e0e0e0',
    value: '[60, 40]',
  })

  const editSetting = (parameter, value) => {
    setPieSettings({
      ...pieSettings,
      [parameter]: value,
    })
  }

  const arcPath = useMemo(() => {
    const arcPathGenerator = d3.arc()
      .innerRadius(pieSettings.inner_radius)
      .outerRadius(pieSettings.outer_radius)
      .startAngle(pieSettings.start_angle)
      .endAngle(pieSettings.end_angle)
      .padAngle(pieSettings.pad_angle)
      .cornerRadius(pieSettings.corner_radius)

    return arcPathGenerator()
  }, [pieSettings])

  const isJson = (string) => {
    try {
      JSON.parse(string);
    } catch (e) {
      return false;
    }
    return true;
  }

  const chartPaths = useMemo(() => {
    const jsonValue = isJson(pieSettings.value) ? JSON.parse(pieSettings.value) : [];
    if (pieSettings.value !== '' && jsonValue) {
      const chartPathGenerator = d3.pie()(jsonValue)
      return chartPathGenerator.map((c) => {
        const chartPathArc = d3.arc()
          .innerRadius(pieSettings.inner_radius)
          .outerRadius(pieSettings.outer_radius)
          .startAngle(c.startAngle)
          .endAngle(c.endAngle)
          .padAngle(pieSettings.pad_angle)
          .cornerRadius(pieSettings.corner_radius)

        return chartPathArc()
      })
    }
    return []
  }, [pieSettings])

  const colors = ['#34ab34', '#a93d48', '#3da99C', '#a13da9', '#ecca22']
  return (
    <>
      <div className="D3Dashboard-Container">
        <Parameters settings={pieSettings} editSetting={editSetting}/>
        <div className="Graph-Container">
          <svg width="200" height="200">
            <path
              fill={pieSettings.fill_color}
              d={arcPath}
              style={{"transform": "translate(50%, 50%)"}}
            />
            { chartPaths.map((p, i) => {
              return (
                <path
                  fill={colors[i%colors.length]}
                  key={i}
                  d={p}
                  style={{"transform": "translate(50%, 50%)"}}
                />
              )
            })}
          </svg>
        </div>
      </div>
    </>
  )
}

export default PieChart
