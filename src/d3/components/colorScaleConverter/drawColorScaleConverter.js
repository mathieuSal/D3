import * as d3 from 'd3'

const drawColorScaleConverter = (settings) => {
  // Reset
  document.getElementById("Converter-Graph").innerHTML = ""

  // Variables
  const width = 600
  let dimensions = {
    width: width,
    height: 250,
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

  const xDomain = [settings.domain_min, settings.domain_max]
  const colorRange = [settings.color_start, settings.color_end]
  const dataset = getDataset(xDomain, settings.steps -1)
  const logAccessor = d => Math.log(d)

  // init graph
  const wrapper = d3.select("#Converter-Graph")
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

  bounds.append("g")
    .attr("class", "y-axis")
    .style("transform", `translateX(${
      -dimensions.margin.left + 45
    }px`)

  // Scales
  const xScale = d3.scaleLinear()
    .domain(xDomain)
    .range([0, dimensions.boundedWidth])

  const colorScale = d3.scaleLinear()
    .domain([0, logAccessor(xDomain[1])])
    .range(colorRange);

  const yScale = d3.scaleLinear()
    .domain([0, logAccessor(xDomain[1])])
    .range([dimensions.boundedHeight, 0])

  // axis
  const xAxisGenerator = d3.axisBottom()
    .scale(xScale)
  const xAxis = bounds.select(".x-axis")
    .call(xAxisGenerator)
  const yAxisGenerator = d3.axisLeft()
    .scale(yScale)
  const yAxis = bounds.select(".y-axis")
    .call(yAxisGenerator)

  // log result
  if (settings.get_log) {
    const result = dataset.map((data) => {
      return {
        value: Math.round(data),
        color: d3.color(colorScale(logAccessor(data))).formatHex()
      }
    })
    console.log(JSON.stringify(result))
    console.log(result)
  }

  // Draw line
  bounds.append("path")
    .datum(dataset)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x((d) => xScale(d))
        .y((d) => yScale(logAccessor(d)))
      )

  bounds.append("path")
    .datum(dataset)
    .attr("class", "listeners")
    .attr("fill", "transparent")
    .attr("d", d3.area()
      .x((d) => xScale(d))
      .y0(dimensions.boundedHeight)
      .y1(() => yScale(logAccessor(xDomain[1])))
    )
    .on("mousemove", onMouseEnter)
    .on("mouseleave", onMouseLeave)

  const tooltip = d3.select("#tooltip-converter")

  function onMouseEnter(event) {
    const currentXPosition = d3.pointer(event)[0];
    const xValue = xScale.invert(currentXPosition);
    const colorValue = colorScale(logAccessor(xValue))
    const yValue = yScale(logAccessor(xValue))
    const x = currentXPosition
      + dimensions.margin.left
      + 15 // container padding
    const y = yValue
      + dimensions.margin.top
      + 15 // container padding

    tooltip.style("opacity", 1)
    tooltip.select("#tooltip-converter-value")
      .text(Math.round(xValue))
    tooltip.select("#tooltip-converter-color")
      .text(d3.color(colorValue).formatHex())
      .attr("style", `color: ${colorValue}`)

    tooltip.style("transform", `translate(`
      + `calc( -50% + ${x}px),`
      + `calc(-100% + ${y}px)`
      + `)`)
  }

  function onMouseLeave() {
    tooltip.style("opacity", 0)
  }
}

const getDataset = (domain, steps) => {
  const diff = domain[1] - domain[0]
  const range = diff / steps
  let value = domain[0]
  const data = [domain[0]]
  for (let i = 0; i < steps; i++) {
    value = value + range
    data.push(value)
  }
  return data
}

export default drawColorScaleConverter
