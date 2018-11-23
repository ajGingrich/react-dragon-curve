import React from 'react'
import DragonCurve from '../src/index'

const HEIGHT = 400
const WIDTH = 400

class App extends React.Component {
  render() {
    const headerStyles = {
      color: '#18003f',
      display: 'flex',
      justifyContent: 'center',
    }

    return (
      <div className="container">
        <div className="row">
          <h2 style={headerStyles}>React Dragon Curve</h2>
          <div styles={{ width: `${WIDTH}px`, height: `${HEIGHT}px` }} >
              <DragonCurve
                height={HEIGHT}
                width={WIDTH}
              />
          </div>
        </div>
      </div>
    )
  }
}

export default App
