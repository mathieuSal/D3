import React, { useState, useEffect } from 'react'
import * as d3 from 'd3'
import './styles/transitions.scss'
import TransitionStep from 'Src/d3/components/transitions/transitionStep'

const Transitions = () => {
  const [initialState, setInitialState] = useState({
    color_start: '#1f77b4',
    color_end: '#ff7f0e',
  })

  const [transitionSettings, setTransitionSettings] = useState({
    transition_type: 1,
    color_start: '#1f77b4',
    color_end: '#ff7f0e',
    ease: 'easeLinear',
    duration: 1000
  })
  const [transitionsProgram, setTransitionProgram] = useState([])

  const TRANSITION_TYPE_OPTIONS = [
    {
      label: "M",
      alt: "Movement",
      value: 1,
    },
    {
      label: "C",
      alt: "Color",
      value: 2,
    },
    {
      label: "M&C",
      alt: "Movement & Color",
      value: 3,
    }
  ]
  const TRANSITION_OPTIONS = [
    'easeLinear',
    'easeQuadIn',
    'easeQuadOut',
    'easeQuad',
    'easeExpIn',
    'easeExpOut',
    'easeExp',
  ]

  const editSetting = (parameter, value) => {
    if (!transitionsProgram.length) {
      setInitialState({
        ...initialState,
        [parameter]: value,
      })
    }
    setTransitionSettings({
      ...transitionSettings,
      [parameter]: value,
    })
  }

  useEffect(() => {
    document.getElementById('circle').removeAttribute('style')
  }, [transitionSettings.color_start])

  const addTransition = () => {
    setTransitionProgram([...transitionsProgram, transitionSettings])
  }

  let i = 0;
  function chainTransition() {
    d3.select('#circle').transition()
      .duration(transitionsProgram[i].duration)
      .attr("cy", i % 2 === 0 ? 400 : 50)
      .style("fill", transitionsProgram[i].color_end)
      .ease(d3[transitionsProgram[i].ease])
      .on("end", () => {
        i++;
        if (i > transitionsProgram.length - 1) {
          d3.select('#circle')
            .transition()
              .duration(1000)
              .attr("cy", 50)
              .style("fill", initialState.color_start)
          return;
        } else {
          chainTransition();//do the transition
        }
      })
  }

  const runTransitionProgram = () => {
    d3.select('#circle')
      .transition()
        .attr("cy", 50)
        .style("fill", initialState.color_start)
        .on("end", () => {
          chainTransition()
        })
  }

  return (
    <>
      <div className="D3Dashboard-Transition-Container">
        <div className="Transition-Form">
          <div className="Input Transition-Type">
            { TRANSITION_TYPE_OPTIONS.map((option) => {
              return (
                <button
                  key={option.value}
                  className={`${transitionSettings.transition_type === option.value ? 'checked' : ''}`}
                  onClick={() => editSetting('transition_type', option.value)}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
          <div className="Input Transition-Ease">
            <select
              name="ease-select"
              id="ease-select"
              value={transitionSettings.ease}
              onChange={(e) => editSetting('ease', e.target.value)}
            >
              { TRANSITION_OPTIONS.map((option, i) => {
                return (
                  <option key={`ease-select-${i}`} value={option}>{option}</option>
                )
              })}
            </select>
          </div>
          <div className="Input Transition-Duration">
            <input
              type="number"
              min={500}
              value={transitionSettings.duration}
              onChange={(e) => editSetting('duration', e.target.value)}
            />
          </div>
          <div className="Input Transition-ColorStart">
            <input
              type="color"
              value={transitionSettings.color_start}
              onChange={(e) => editSetting('color_start', e.target.value)}
            />
          </div>
          <div className="Input Transition-ColorEnd">
            <input
              type="color"
              value={transitionSettings.color_end}
              onChange={(e) => editSetting('color_end', e.target.value)}
            />
          </div>
          <div className="Transition-Add">
            <button onClick={addTransition}>Add</button>
          </div>
        </div>
        <div className="Transition-Container">
          <svg viewBox="0 0 100 550" width="100" height="450">
            <circle id="circle" cx="50" cy="50" r="40" fill={initialState.color_start} />
          </svg>
        </div>
        <div className="Transition-List">
          { transitionsProgram.length
            ? transitionsProgram.map((step, i) => {
              return (
                <div className="Transition-Step" id={`Transition-Step-${i}`}>
                  <TransitionStep step={step} key={i} />
                </div>
              )
            })
            : <span>no program yet</span>
          }
        </div>
        <div className="Parameter-Run">
          <button onClick={runTransitionProgram}>Run Program</button>
        </div>
      </div>
    </>
  )
}

export default Transitions
