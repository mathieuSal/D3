import React, { useEffect } from 'react'
import * as d3 from 'd3'
import json from './data/data'

const drawBars = () => {
  let dataset = json

  const summaryAccessor = d => d.Summary
  const actualHoursAccessor = d => +d.HoursActual
  const developerHoursAccessor = d => +d.DeveloperHoursActual
  // Only use the first estimate per task (with highest actual hours)
  let usedTasks = {}
  dataset = dataset.filter(d => {
    const hours = actualHoursAccessor(d)
    if (usedTasks[summaryAccessor(d)]) {
      const hasHigherValue = hours > usedTasks[summaryAccessor(d)]
      if (!hasHigherValue) return false
    }
    usedTasks[summaryAccessor(d)] = hours
    return actualHoursAccessor(d) > 10
  })
  const diffAccessor = d => +d.HoursEstimate - actualHoursAccessor(d)
  dataset = dataset.filter(d => (
    diffAccessor(d) >= -50
    && diffAccessor(d) <= 50
  ))
  const yAccessor = d => d.length

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

  const wrapper = d3.select("#D3Dashboard-BarChart-Container")
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

  // init static elements
  bounds.append("g")
    .attr("class", "bins")
  bounds.append("line")
    .attr("class", "mean")
  bounds.append("g")
    .attr("class", "x-axis")
    .style("transform", `translateY(${
      dimensions.boundedHeight
    }px)`)
    .append("text")
    .attr("class", "x-axis-label")
  bounds.append("g")
    .attr("class", "y-axis")
    .append("text")
    .attr("class", "y-axis-label")

  const xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, diffAccessor))
    .range([0, dimensions.boundedWidth])
    .nice()
  const binsGenerator = d3.histogram()
    .domain(xScale.domain())
    .value(diffAccessor)
    .thresholds(30)
  const bins = binsGenerator(dataset)
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(bins, yAccessor)])
    .range([dimensions.boundedHeight, 0])
    .nice()

  const barPadding = 1.5
  let binGroups = bounds.select(".bins")
    .selectAll(".bin")
    .data(bins)
  binGroups.exit()
    .remove()
  const newBinGroups = binGroups.enter().append("g")
    .attr("class", "bin")
  newBinGroups.append("rect")
  // update binGroups to include new points
  binGroups = newBinGroups.merge(binGroups)
  const barRects = binGroups.select("rect")
    .attr("key", (d) => d.x0)
    .attr("x", d => xScale(d.x0) + barPadding)
    .attr("y", d => yScale(yAccessor(d)))
    .attr("height", d => (
      dimensions.boundedHeight - yScale(yAccessor(d))
    ))
    .attr("width", d => d3.max([
      0,
      xScale(d.x1) - xScale(d.x0) - barPadding
    ]))
  const mean = d3.mean(dataset, diffAccessor)
  const meanLine = bounds.selectAll(".mean")
    .attr("x1", xScale(mean))
    .attr("x2", xScale(mean))
    .attr("y1", -20)
    .attr("y2", dimensions.boundedHeight)
  const meanLabel = bounds.append("text")
    .attr("class", "mean-label")
    .attr("x", xScale(mean))
    .attr("y", -25)
    .text("mean")

  const xAxisGenerator = d3.axisBottom()
    .scale(xScale)
  const xAxis = bounds.select(".x-axis")
    .call(xAxisGenerator)
  const yAxisGenerator = d3.axisLeft()
    .scale(yScale)
  const yAxis = bounds.select(".y-axis")
    .call(yAxisGenerator)
  const xAxisLabel = xAxis.select(".x-axis-label")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", dimensions.margin.bottom - 10)
    .text("Hours over-estimated")
  const yAxisLabel = yAxis.select(".y-axis-label")
    .attr("x", dimensions.boundedHeight / 2)
    .attr("y", dimensions.margin.bottom - 10)
    .style("transform", "rotate(90deg)")
    .text("number")
  const backgroundLeft = background.append("rect")
    .attr("class", "background left-side-background")
    .attr("y", -20)
    .attr("width", dimensions.boundedWidth / 2)
    .attr("height", dimensions.boundedHeight + 20)
  const backgroundRight = background.append("rect")
    .attr("class", "background right-side-background")
    .attr("x", dimensions.boundedWidth / 2 + 1)
    .attr("y", -20)
    .attr("width", dimensions.boundedWidth / 2 - 1)
    .attr("height", dimensions.boundedHeight + 20)
  const leftSideLabel = background.append("text")
    .attr("class", "label left-side-label")
    .attr("x", 10)
    .attr("y", 0)
    .text("Under-estimated")
  const rightSideLabel = background.append("text")
    .attr("class", "label right-side-label")
    .attr("x", dimensions.boundedWidth - 10)
    .attr("y", 0)
    .text("Over-estimated")

  const tooltip = d3.select("#tooltip")

  const barRectsListeners = bounds.selectAll(".listeners")
    .data(bins)
    .enter().append("rect")
    .attr("class", "listeners")
    .attr("x", d => xScale(d.x0))
    .attr("y", -dimensions.margin.top)
    .attr("height", dimensions.boundedHeight + dimensions.margin.top)
    .attr("width", d => d3.max([
      0,
      xScale(d.x1) - xScale(d.x0)
    ]))
    .on("mouseenter", onMouseEnter)
    .on("mouseleave", onMouseLeave)

  function onMouseEnter(event, datum) {
    tooltip.style("opacity", 1)
    tooltip.select("#range")
      .text([
        datum.x0 < 0
          ? `Under-estimated by`
          : `Over-estimated by`,
        Math.abs(datum.x0),
        "to",
        Math.abs(datum.x1),
        "hours",
      ].join(" "))

    tooltip.select("#examples")
      .html(
        datum
          .slice(0, 3)
          .map(summaryAccessor)
          .join("<br />")
      )

    tooltip.select("#count")
      .text(Math.max(0, yAccessor(datum) - 2))

    const percentDeveloperHoursValues = datum.map(d => (
      (developerHoursAccessor(d) / actualHoursAccessor(d)) || 0
    ))
    const percentDeveloperHours = d3.mean(percentDeveloperHoursValues)
    const formatHours = d => d3.format(",.2f")(Math.abs(d))
    tooltip.select("#tooltip-bar-value")
      .text(formatHours(percentDeveloperHours))
    tooltip.select("#tooltip-bar-fill")
      .style("width", `${percentDeveloperHours * 100}%`)
    const x = xScale(datum.x0)
      + (xScale(datum.x1) - xScale(datum.x0)) / 2
      + dimensions.margin.left
      + 15 // container padding

    const y = yScale(yAccessor(datum))
      + dimensions.margin.top
      + 15 // container padding

    tooltip.style("transform", `translate(`
      + `calc( -50% + ${x}px),`
      + `calc(-100% + ${y}px)`
      + `)`)

    const hoveredBar = binGroups.select(`rect[key='${datum.x0}']`)
    hoveredBar.classed("hovered", true)
  }

  function onMouseLeave() {
    tooltip.style("opacity", 0)
    barRects.classed("hovered", false)
  }
}

const BarChart = () => {
  useEffect(() => {
    drawBars()
  }, [])

  return (
    <div id="D3Dashboard-BarChart-Container" className="D3Dashboard-BarChart-Container">
      <div id="tooltip" className="tooltip">
        <div className="tooltip-range" id="range" />
        <div className="tooltip-examples" id="examples" />
        <div className="tooltip-value">
          ...of <span id="count" /> tasks
        </div>
        <div className="tooltip-bar-value">
          <b><span id="tooltip-bar-value" />%</b>
          of the work was done by developers
        </div>
        <div className="tooltip-bar">
          <div className="tooltip-bar-fill" id="tooltip-bar-fill" />
        </div>
      </div>
    </div>
  )
}

export default BarChart
