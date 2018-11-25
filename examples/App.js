import React from 'react'
import DragonCurve from '../src/index'

const HEIGHT = 700
const WIDTH = 700

class App extends React.Component {
  render() {
    const headerStyles = {
      color: '#18003f',
      display: 'flex',
      justifyContent: 'center',
      paddingBottom: '5rem',
    }

    return (
      <div className="container">
        <div className="row">
          <h2 style={headerStyles}>React Dragon Curve</h2>
            <DragonCurve
              height={HEIGHT}
              width={WIDTH}
              wrapperStyles={{ display: 'flex', justifyContent: 'center' }}
              strokeColor={'#d3dee2'}
            />
        </div>
      </div>
    )
  }
}

export default App
