import React, { useState, useEffect } from 'react'
import Scrollbar from 'react-scrollbars-custom'
import TransitionStep from 'Src/d3/components/transitions/transitionStep'
import chainTransition from 'Src/d3/components/transitions/chainTransition'
import './styles/transitions.scss'

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

  const runTransitionProgram = () => {
    chainTransition('#circle', transitionsProgram, initialState)
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
            ? <Scrollbar
              noScrollX
              style={{width: '150px', height: '280px'}}
            > { transitionsProgram.map((step, i) => {
                return (
                  <div className="Transition-Step" id={`Transition-Step-${i}`} key={i} >
                    <TransitionStep step={step} />
                  </div>
                )
              })
            }
            </Scrollbar>
            : <span>no program yet</span>
          }
        </div>
        <div className="Parameter-Run">
          <button
            onClick={runTransitionProgram}
            className={`${!transitionsProgram.length ? 'disabled' : ''}`}
            disabled={!transitionsProgram.length}
          >
            Run Program
          </button>
        </div>
      </div>
    </>
  )
}

export default Transitions
