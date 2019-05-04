import React from 'react'
import DragonCurve from '../src/index'

class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <h2>React Dragon Curve</h2>
          <DragonCurve
            height={600}
            width={600}
            controlClassnames={{
              controlContainer: 'button-container',
              controlStart: 'btn btn-primary',
              controlReset: 'btn btn-warning',
              controlPause: 'btn btn-warning',
            }}
            strokeWidth={2}
            strokeColor={'#d3dee2'}
            lineLength={25}
            animationSpeed={1500}
          />
      </div>
    )
  }
}

export default App
