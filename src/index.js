import React from 'react'
import StageWrap from 'react-konva'

import Portal from './Portal'
const { Stage, Layer, Line } = StageWrap

const X_ORIGIN = 0
const Y_ORIGIN = 0
const LINE_LENGTH = 100

const buildLine = (iteration) => {
  const initialLine = [0, 0, LINE_LENGTH, 0]

  if(iteration === 1) return initialLine

  return [0, 0, LINE_LENGTH, 0, LINE_LENGTH, -LINE_LENGTH]
}

const buildBackwardLine = (forwardPoints, endX, endY) => {
  const backwards = [...Array(forwardPoints.length)]
  const forwardPointsReversed = forwardPoints.slice(0).reverse()

  for(let i=0; i<backwards.length - 1; i+=2) { // eslint-disable-line
    backwards[i] = forwardPointsReversed[i+1] - endX
    backwards[i+1] = forwardPointsReversed[i] - endY
  }

  return backwards
}

const buildEndPoints = (forwardPoints) => (
  { endX: forwardPoints[forwardPoints.length - 2], endY: forwardPoints[forwardPoints.length - 1]}
)

class DragonCurve extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      iteration: 1,
    }
  }

  rotate = () => {
    const { iteration } = this.state

    this.line.to({
      rotation: 90,
      duration: 1
    })

    // set timeout aftewards
    // this.setState({ iteration: iteration + 1 })
  }

  render() {
    const { height, width, wrapperStyles, strokeColor } = this.props
    const { iteration } = this.state
    const offsetX = width / 2
    const offsetY = height / 2
    const forwardPoints = buildLine(iteration)
    const { endX, endY } = buildEndPoints(forwardPoints)
    const backwardPoints = buildBackwardLine(forwardPoints, endX, endY)

    return (
      <div style={wrapperStyles} >
        <Stage width={width} height={height} >
          <Portal>
            <div className={'button'}>
              <button onClick={this.rotate}>Click Me</button>
            </div>
          </Portal>
          <Layer>
            <Line
              ref={node => { this.line = node }}
              x={endX + offsetX}
              y={endY + offsetY}
              points={backwardPoints}
              stroke={strokeColor}
              strokeWidth={2}
              draggable
            />
            <Line
              x={X_ORIGIN + offsetX}
              y={Y_ORIGIN + offsetY}
              points={forwardPoints}
              stroke={strokeColor}
              strokeWidth={2}
              draggable
            />
          </Layer>
        </Stage>
      </div>
    )
  }
}

export default DragonCurve
