import React from 'react'
import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'

import Canvas from './Canvas'

class PgnViewer extends React.Component {
  render() {
    const { height, width, wrapperStyles, containerName } = this.props

    return (
      <div style={wrapperStyles} >
        <Canvas
          height={height}
          width={width}
        />
      </div>
    )
  }
}

export default PgnViewer
