import * as d3 from 'd3'
import data from 'Src/d3/components/barChartCustom/data/data'

const drawBars = () => {
  // ACCESSOR
  const nameAccessor = d => d.name
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
    .style("transform", `translate(${
      -dimensions.margin.left
    }px, ${
      dimensions.boundedHeight
    }px)`)
    .append("text")
    .attr("class", "x-axis-label")

  bounds.append("g")
    .attr("class", "y-axis")
    .style("transform", `translateY(${
      -dimensions.margin.top
    }px)`)
    .append("text")
    .attr("class", "y-axis-label")

  const xScale = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
    .padding(0.1)

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, valueAccessor)])
    .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])
    .nice()

  const xAxisGenerator = d3.axisBottom()
    .tickFormat(i => data[i].name)
    .tickSizeOuter(0)
    .scale(xScale)
  const xAxis = bounds.select(".x-axis")
    .call(xAxisGenerator)

  const yAxisGenerator = d3.axisLeft()
    .scale(yScale)
  const yAxis = bounds.select(".y-axis")
    .call(yAxisGenerator)

  const xAxisLabel = xAxis.select(".x-axis-label")
    .attr("x", dimensions.boundedWidth / 2 + dimensions.margin.left)
    .attr("y", dimensions.margin.bottom - 10)
    .text("Letter")
  const yAxisLabel = yAxis.select(".y-axis-label")
    .attr("x", dimensions.boundedHeight / 2 + dimensions.margin.top)
    .attr("y", dimensions.margin.bottom - 5)
    .style("transform", "rotate(90deg)")
    .text("Value")

  const tooltip = d3.select("#tooltip-BarChartCustom")

  bounds.append("g")
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("x", (d, i) => xScale(i) - dimensions.margin.left)
      .attr("y", d => yScale(valueAccessor(d)) - dimensions.margin.top)
      .attr("height", d => (
        yScale(0) - yScale(valueAccessor(d))
      ))
      .attr("width", () => xScale.bandwidth())
      .attr("fill", (d, i) => d3.schemeCategory10[i%10])
    .on("mouseenter", onMouseEnter)
    .on("mouseleave", onMouseLeave)

  function onMouseEnter(event, datum) {
    tooltip.style("opacity", 1)
    tooltip.select("#tooltip-BarChartCustom-value")
      .text(datum.value)
    const index = data.findIndex((d) => nameAccessor(d) === nameAccessor(datum))
    const x = xScale(index)
      - (dimensions.margin.left / 2)
      + 5 // container padding

    const y = yScale(valueAccessor(datum))
      - dimensions.margin.top
      + 10 // container padding

    tooltip.style("transform", `translate(`
      + `${x}px,`
      + `${y}px`
      + `)`)
  }

  function onMouseLeave() {
    // tooltip.style("opacity", 0)
  }
}

export default drawBars
