import React from 'react'
import PropTypes from 'prop-types'

const TransitionStep = ({step}) => {
  switch (step.transition_type) {
    case 1:
      return <TransitionStepM step={step} />
    case 2:
      return <TransitionStepC step={step} />
    case 3:
      return <TransitionStepMC step={step} />
  }
}

const TransitionStepM = ({step}) => {
  return (
    <p>
      Movement
      <br />
      {step.duration}ms
      <br />
      {step.ease}
    </p>
  )
}

const TransitionStepC = ({step}) => {
  return (
    <p>
      <span style={{"color": step.color_start}}>
        {step.color_start}
      </span>
      &nbsp;->&nbsp;
      <span style={{"color": step.color_end}}>
        {step.color_end}
      </span>
      <br />
      {step.duration}ms
      <br />
      {step.ease}
    </p>
  )
}

const TransitionStepMC = ({step}) => {
  return (
    <p>
      Movement
      <br />
      <span style={{"color": step.color_start}}>
        {step.color_start}
      </span>
      &nbsp;->&nbsp;
      <span style={{"color": step.color_end}}>
        {step.color_end}
      </span>
      <br />
      {step.duration}ms
      <br />
      {step.ease}
    </p>
  )
}

TransitionStep.propTypes = {
  step: PropTypes.object
}

TransitionStepM.propTypes = {
  step: PropTypes.object
}

TransitionStepC.propTypes = {
  step: PropTypes.object
}

TransitionStepMC.propTypes = {
  step: PropTypes.object
}

export default TransitionStep
