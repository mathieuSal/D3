import * as d3 from 'd3'

const drawRect = () => {
  const domainData = [0, 5000]
  const colorRange = ['#1f77b4', '#ff7f0e']
  // DIMENSIONS
  const width = 600
  let dimensions = {
    width: width,
    height: width * 0.2,
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
  const wrapper = d3.select("#D3Dashboard-ColorGradient-Container")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)
  const bounds = wrapper.append("g")

  const xScale = d3.scaleLog()
    .domain(domainData)
    .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])

  const diff = domainData[1] - domainData[0]

  const step = diff / (colorRange.length - 1)
  const forInversion = d3.range(colorRange.length).map((d) => domainData[0] + d * step)
  const logColorValues = forInversion.map(xScale.invert)
  const colorScale = d3.scaleLog()
    .domain(logColorValues)
    .range(colorRange)

  const num_rectangles = 100

  const rectStep = diff/num_rectangles
  const rectData = d3.range(num_rectangles).map((d) => domainData[0] + d * rectStep)

  bounds.selectAll("rect").data(rectData).enter()
    .append("rect")
    .attr("x", (d) => d)
    .attr("y", () => 100)
    .attr("height", () => 20)
    .attr("width", () => diff/num_rectangles)
    .attr("fill", (d) => colorScale(xScale.invert(d)))
}

export default drawRect
