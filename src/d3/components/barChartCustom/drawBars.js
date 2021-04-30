import * as d3 from 'd3'
import data from 'Src/d3/components/barChartCustom/data/data'

const drawBars = () => {
  console.log(data)
  // ACCESSOR
  const dateAccessor = d => d.date
  const valueAccessor = d => d.value

  // DIMENSIONS
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
}

export default drawBars
