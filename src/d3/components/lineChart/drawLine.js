import * as d3 from 'd3'
import data from './data/data'

const drawLine = () =>  {
  const dataset = data.map((d) => {
    return {
      ...d,
      date: new Date(d.date),
    }
  })

  const dateAccessor = d => d.date
  const valueAccessor = d => d.value

  const width = 600
  let dimensions = {
    width: width,
    height: width * 0.5,
    margin: {
      top: 35,
      right: 10,
      bottom: 50,
      left: 50,
    },
  }

  dimensions.boundedWidth = dimensions.width
    - dimensions.margin.left
    - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height
    - dimensions.margin.top
    - dimensions.margin.bottom

  const wrapper = d3.select("#D3Dashboard-LineChart-Container")
    .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
  const bounds = wrapper.append("g")
    .style("transform", `translate(${
      dimensions.margin.left
    }px, ${
      dimensions.margin.top
    }px)`)

  bounds.append("g")
    .attr("class", "x-axis")
    .style("transform", `translate(${
      -dimensions.margin.left + 45
    }px, ${
      dimensions.boundedHeight
    }px)`)
    .append("text")
      .attr("class", "x-axis-label")

  bounds.append("g")
    .attr("class", "y-axis")
    .style("transform", `translateX(${
      -dimensions.margin.left + 45
    }px`)
    .append("text")
      .attr("class", "y-axis-label")

  const xScale = d3.scaleTime()
    .domain(d3.extent(dataset, dateAccessor))
    .range([0, dimensions.boundedWidth])
    .nice()
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, valueAccessor)])
    .range([dimensions.boundedHeight, 0])
    .nice()

  const xAxisGenerator = d3.axisBottom()
    .scale(xScale)
  const xAxis = bounds.select(".x-axis")
    .call(xAxisGenerator)
  const yAxisGenerator = d3.axisLeft()
    .scale(yScale)
  const yAxis = bounds.select(".y-axis")
    .call(yAxisGenerator)

  bounds.append("path")
    .datum(dataset)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x((d) => xScale(dateAccessor(d)))
        .y((d) => yScale(valueAccessor(d)))
      )

  bounds.append("path")
    .datum(dataset)
      .attr("class", "area")
      .attr("fill", "lightsteelblue")
      .attr("d", d3.area()
        .x((d) => xScale(dateAccessor(d)))
        .y0(dimensions.boundedHeight)
        .y1((d) => yScale(valueAccessor(d)))
      )
}

export default drawLine
