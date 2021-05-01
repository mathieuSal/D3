import * as d3 from 'd3'
import data from 'Src/d3/components/barChartCustom/data/data'

const drawBars = () => {
  // ACCESSOR
  const dateAccessor = d => new Date(d.date)
  const valueAccessor = d => d.value

  // DIMENSIONS
  const width = 600
  let dimensions = {
    width: width,
    height: width * 0.5,
    margin: {
      top: 35,
      right: 50,
      bottom: 50,
      left: 60,
    },
  }
  dimensions.boundedWidth = dimensions.width
    - dimensions.margin.left
    - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height
    - dimensions.margin.top
    - dimensions.margin.bottom

  // INITIATE CHART
  const wrapper = d3.select("#D3Dashboard-BarChartCustom-Container")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)
  const bounds = wrapper.append("g")
    .style("transform", `translate(${
      dimensions.margin.left
    }px, ${
      dimensions.margin.top
    }px)`)
  const background = bounds.append("g")

  bounds.append("g")
    .attr("class", "x-axis")
    .style("transform", `translateY(${
      dimensions.boundedHeight
    }px)`)
    .append("text")
    .attr("class", "x-axis-label")

  const xScale = d3.scaleTime()
    .domain(d3.extent(data, dateAccessor))
    .range([0, dimensions.boundedWidth])
    .nice()

  const xAxisGenerator = d3.axisBottom()
    .scale(xScale)
  const xAxis = bounds.select(".x-axis")
    .call(xAxisGenerator)
  const xAxisLabel = xAxis.select(".x-axis-label")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", dimensions.margin.bottom - 10)
    .text("Date")
  const binsGenerator = d3.histogram()
    .domain(xScale.domain())
    .value(dateAccessor)
    .thresholds(data.length)
  const bins = binsGenerator(data)
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, valueAccessor)])
    .range([dimensions.boundedHeight, 0])
    .nice()
  const yAxisGenerator = d3.axisLeft()
    .scale(yScale)
  const yAxis = bounds.select(".y-axis")
    .call(yAxisGenerator)
  const yAxisLabel = yAxis.select(".y-axis-label")
    .attr("x", dimensions.boundedHeight / 2)
    .attr("y", dimensions.margin.bottom - 10)
    .style("transform", "rotate(90deg)")
    .text("value")
}

export default drawBars
