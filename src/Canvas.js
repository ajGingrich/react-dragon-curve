import React from 'react'
import StageWrap from 'react-konva'

import Portal from './Portal'
const { Stage, Layer, Line, Text } = StageWrap

const X_ORIGIN = 0
const Y_ORIGIN = 0
const LINE_LENGTH = 100

const points = [
  { x: 0, y: 100 },
  { x: 100, y: 50 }
]

class Board extends React.Component {

  // rotate = () => {
  //   this.line.rotate({
  //     scaleX: Math.random() + 0.8,
  //     scaleY: Math.random() + 0.8,
  //     duration: 0.2,
  //   })
  // }

  rotate = () => {
    console.log('rotating')

    // how to animate this

    this.line.rotation(this.line.rotation() + 90);
  }

  render() {
    const { height, width } = this.props
    const offsetX = width / 2
    const offsetY = height / 2

    return (
      <Stage width={width} height={height} >
        <Portal>
          <div className={'button'}>
            <button onClick={this.rotate}>Click Me</button>
          </div>
        </Portal>
        <Layer>
          <Line
            ref={node => { this.line = node }}
            x={X_ORIGIN + offsetX}
            rotation={90}
            y={Y_ORIGIN + offsetY}
            points={[0, 0, 100, 0, 100, -100]}
            strokeWidth={2}
            draggable
            stroke="black"
          />
        </Layer>
      </Stage>
    )
  }
}

export default Board
