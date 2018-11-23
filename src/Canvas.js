import React from 'react'
import Konva from 'konva'
import StageWrap from 'react-konva'

// import angle from './assets/right-angle.png'
const { Stage, Layer, Line, Text, Star } = StageWrap

const X_ORIGIN = 0
const Y_ORIGIN = 0
const LINE_LENGTH = 100

const points = [
  { x: 0, y: 100 },
  { x: 100, y: 50 }
]

class Board extends React.Component {

  handleDragStart = (e) => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15
      },
      scaleX: 1.1,
      scaleY: 1.1
    });
  };

  handleDragEnd = (e) => {
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    });
  };

  changeSize = () => {
    this.line.to({
      scaleX: Math.random() + 0.8,
      scaleY: Math.random() + 0.8,
      duration: 0.2,
    })
  }

  render() {
    const { height, width } = this.props
    const offsetX = width / 2
    const offsetY = height / 2

    return (
      <Stage width={width} height={height} >
        <Layer>
          <Line
            ref={node => { this.line = node }}
            x={X_ORIGIN + offsetX}
            y={Y_ORIGIN + offsetY}
            points={[0, 0, 100, 0, 0, 0]}
            strokeWidth={2}
            onDragEnd={this.changeSize}
            draggable
            stroke="black"
          />
        </Layer>
      </Stage>
    )
  }
}

export default Board
