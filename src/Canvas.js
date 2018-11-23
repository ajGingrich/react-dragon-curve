import React from 'react'
import Konva from 'konva'
import StageWrap from 'react-konva'

// import angle from './assets/right-angle.png'
const { Stage, Layer, Line, Text, Star } = StageWrap

const lines = [
  { x: 0, y: 0 },
  { x: 100, y: 200 },
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

  render() {
    const { height, width } = this.props
    const offsetX = width / 2
    const offsetY = height / 2

    return (
      <Stage width={width} height={height} >
        <Layer>
          {lines.map((line, i) => {
            const { x, y } = line

            return (
              <Line
                key={`star-draggable-${i}`}
                x={x + offsetX}
                y={y + offsetY}
                points={[0, 0, 100, 0, 0, 0]}
                strokeWidth={3}
                closed
                stroke="black"
              />
            )
          })}
        </Layer>
      </Stage>
    )
  }
}

export default Board
