import React from 'react'
import Konva from 'konva'
import StageWrap from 'react-konva'

// import angle from './assets/right-angle.png'
const { Stage, Layer, Line, Text, Star } = StageWrap

const lines = [
  { x: 0, y: 0 },
  { x: 400, y: 300 },
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

    //offsetX
    //offsetY

    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {lines.map((line, i) => {
            const { x, y } = line

            return (
              <Line
                key={`star-draggable-${i}`}
                x={x}
                y={y}
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
