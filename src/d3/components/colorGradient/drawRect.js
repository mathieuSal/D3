import * as d3 from 'd3'
import data from 'Src/d3/components/barChartCustom/data/data'

const drawRect = (params) => {
  // reset graph
  document.getElementById('Gradient-Graph').innerHTML = ""

  const rangeData = [params.range_min, params.range_max]
  const colorRange = [params.color_min, params.color_max]
  // DIMENSIONS
  const width = 600
  let dimensions = {
    width: width,
    height: width * 0.15,
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
  const wrapper = d3.select("#Gradient-Graph")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)
  const bounds = wrapper.append("g")
    .style("transform", `translate(${
      dimensions.margin.left
    }px, ${
      -dimensions.margin.top
    }px)`)

  bounds.append("g")
    .attr("class", "x-axis")
    .style("transform", "translate(0px, 55px)")

  const domainData = [dimensions.margin.left, dimensions.width - dimensions.margin.right]
  const xScale = d3.scaleLog()
    .domain(domainData)
    .range(rangeData)

  const linearScale = d3.scaleLinear()
    .domain(rangeData)
    .range([0, dimensions.boundedWidth])

  const logAxisGenerator = d3.axisTop()
    .scale(linearScale)

  const xAxis = bounds.select(".x-axis")
    .call(logAxisGenerator)

  const diff = domainData[1] - domainData[0]

  const step = diff / (colorRange.length - 1)
  const forInversion = d3.range(colorRange.length).map((d) => rangeData[0] + d * step)
  const logColorValues = forInversion.map(xScale.invert)
  const colorScale = d3.scaleLog()
    .domain(logColorValues)
    .range(colorRange)
  const num_rectangles = 1000

  const rectStep = diff/num_rectangles
  const rectData = d3.range(num_rectangles).map((d) => rangeData[0] + d * rectStep)

  bounds.selectAll("rect").data(rectData).enter()
    .append("rect")
    .attr("x", (d) => d)
    .attr("y", () => 100)
    .attr("height", () => 20)
    .attr("width", () => diff/num_rectangles)
    .attr("fill", (d) => colorScale(xScale.invert(d)))
}

export default drawRect
