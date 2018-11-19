import React from 'react'
import DragonCurve from '../src/index'

class App extends React.Component {
  render() {
    const headerStyles = {
      color: '#18003f',
      display: 'flex',
      justifyContent: 'center',
    }

    // <h2 style={headerStyles}>React Dragon Curve</h2>

    return (
      <div className="container">
        <div className="row">
          <DragonCurve />
        </div>
      </div>
    )
  }
}

export default App
