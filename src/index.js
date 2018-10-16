import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import angle from './assets/right-angle.png'

class PgnViewer extends React.Component {
  render() {
    return (
      <div>
        <img src={angle} />
      </div>
    )
  }
}

export default PgnViewer
