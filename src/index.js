import React from 'react'
import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'

import Canvas from './Canvas'

class PgnViewer extends React.Component {
  render() {
    const { height, width } = this.props

    return (
      <div>
        <Canvas
          height={height}
          width={width}
        />
      </div>
    )
  }
}

export default PgnViewer
