import * as d3 from 'd3'

let i = 0;
const chainTransition = (id, program, initialState) => {
  i = 0 // reset i in case of second run
  d3.select(id)
    .transition()
      .attr("cy", 50)
      .style("fill", initialState.color_start)
    .on("end", () => {
      chainTransitionProgram('#circle', program, initialState)
    })
}
const chainTransitionProgram = (id, program, initialState) => {
  switch (program[i].transition_type) {
    case 1:
      chainTransitionProgramM(id, program, initialState)
      break
    case 2:
      chainTransitionProgramC(id, program, initialState)
      break
    case 3:
      chainTransitionProgramCM(id, program, initialState)

  }
}

const chainTransitionProgramM = (id, program, initialState) => {
  d3.select(id)
    .transition()
      .duration(program[i].duration)
      .attr("cy", i % 2 === 0 ? 400 : 50)
      .ease(d3[program[i].ease])
    .on("end", () => {
      i++;
      if (i > program.length - 1) {
        chainTransitionEnd(id, initialState)
      } else {
        chainTransitionProgram(id, program, initialState);
      }
    })
}

const chainTransitionProgramC = (id, program, initialState) => {
  d3.select(id)
    .transition()
      .style("fill", program[i].color_start)
    .transition()
      .duration(program[i].duration)
      .style("fill", program[i].color_end)
      .ease(d3[program[i].ease])
    .on("end", () => {
      i++;
      if (i > program.length - 1) {
        chainTransitionEnd(id, initialState)
      } else {
        chainTransitionProgram(id, program, initialState);
      }
    })
}

const chainTransitionProgramCM = (id, program, initialState) => {
  d3.select(id)
    .transition()
      .style("fill", program[i].color_start)
    .transition()
      .duration(program[i].duration)
      .attr("cy", i % 2 === 0 ? 400 : 50)
      .style("fill", program[i].color_end)
      .ease(d3[program[i].ease])
    .on("end", () => {
      i++;
      if (i > program.length - 1) {
        chainTransitionEnd(id, initialState)
      } else {
        chainTransitionProgram(id, program, initialState);
      }
    })
}

const chainTransitionEnd = (id, initialState) => {
  d3.select(id)
    .transition()
      .duration(1000)
      .attr("cy", 50)
      .style("fill", initialState.color_start)
}

export default chainTransition;
