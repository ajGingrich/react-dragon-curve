import React from 'react'
import Konva from 'konva'
import StageWrap from 'react-konva'

// import angle from './assets/right-angle.png'
const { Stage, Layer, Line, Text } = StageWrap

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

    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Line
            x={5}
            y={0}
            fill="#89b717"
            width={10}
            opacity={0.8}
            draggable
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            onDragStart={this.handleDragStart}
            onDragEnd={this.handleDragEnd}
          />
        </Layer>
      </Stage>
    )
  }
}

export default Board
