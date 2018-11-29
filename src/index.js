import React from 'react'
import StageWrap from 'react-konva'

import Portal from './Portal'
const { Stage, Layer, Line } = StageWrap

const X_ORIGIN = 0
const Y_ORIGIN = 0
const LINE_LENGTH = 50
const TIMEOUT = 1000

const buildLine = (iteration) => {
  const initialLine = [0, 0, LINE_LENGTH, 0]

  if(iteration === 1) return initialLine

  if(iteration === 2) return [0, 0, LINE_LENGTH, 0, LINE_LENGTH, -LINE_LENGTH]

  if(iteration === 3) return [0, 0, LINE_LENGTH, 0, LINE_LENGTH, -LINE_LENGTH, 0, -LINE_LENGTH, 0, -LINE_LENGTH*2]

  return [0, 0, LINE_LENGTH, 0, LINE_LENGTH, -LINE_LENGTH, 0, -LINE_LENGTH, 0, -LINE_LENGTH*2, -LINE_LENGTH, -LINE_LENGTH*2, -LINE_LENGTH, -LINE_LENGTH, -LINE_LENGTH*2, -LINE_LENGTH, -LINE_LENGTH*2, -LINE_LENGTH*2]
}

const calculateScale = (iteration) => {
  if(iteration < 3) return 1

  return 0.8
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

  handleStart = () => {
    this.rotate()
  }

  handleReset = () => {
    this.setState({ iteration: 1 })
    this.line.to({ rotation: 0, duration: 0 })
  }

  rotate = () => {
    const { iteration } = this.state

    this.line.attrs.rotation = 0
    this.line.to({ rotation: 90, duration: TIMEOUT / 1000 })

    // make componentDidUpdateDo this and add in progress??
    setTimeout(() => {
      this.setState({ iteration: iteration + 1 })
      this.rotate()
    }, TIMEOUT)
  }

  render() {
    const { height, width, wrapperStyles, strokeColor } = this.props
    const { iteration } = this.state
    const scale = calculateScale(iteration)
    const offsetX = (width / 2) / scale
    const offsetY = (height / 2) / scale
    const forwardPoints = buildLine(iteration)
    const { endX, endY } = buildEndPoints(forwardPoints)
    const backwardPoints = buildBackwardLine(forwardPoints, endX, endY)

    return (
      <div style={wrapperStyles} >
        <Stage
          width={width}
          height={height}
          scaleX={scale}
          scaleY={scale}
        >
          <Portal>
            <div >
              <button className={'btn btn-primary'} onClick={this.handleStart}>Start</button>
              <button className={'btn btn-warning'} onClick={this.handleReset}>Reset</button>
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
