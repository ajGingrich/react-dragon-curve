import React from 'react'
import PropTypes from 'prop-types'
import StageWrap from 'react-konva'

import Portal from './Portal'
const { Stage, Layer, Line } = StageWrap

const X_ORIGIN = 0
const Y_ORIGIN = 0

// From the Lindenmayer system
// https://en.wikipedia.org/wiki/L-system
// Alaphabet: X, Y
// Constants: F, +, -
// Start: FX
// Rules: (X -> X+YF+), (Y -> -FX-Y)
// where F means draw forward, - means turn left 90, + means turn right 90
// X and Y do not correspond to any drawing action and are only used to control the evolution of the curve

const calculateScale = (iteration) => {
  //work on scale
  if(iteration <= 5) return 0.9

  if(iteration <= 10) return 0.1

  if(iteration <= 15) return 0.05

  if(iteration <= 20) return 0.02

  return 0.005
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
      isPlaying: null,
      test: false,
    }

    this.lineMemory = ['FX']
    this.pointsMemory = [[0, 0, this.props.lineLength, 0]]
    this.angleMemory = [90]
  }

  handleReset = () => {
    this.setState({ iteration: 1, isPlaying: false })
    this.line.to({ rotation: 0, duration: 0 })
  }

  buildLineString = (iteration) => {
    if(iteration === 1) return this.lineMemory[0]

    const previousLine = this.lineMemory[iteration - 2].split('')
    let newLine = ''

    for (const c of previousLine) {
      if(c === 'X') {
        newLine += 'X+YF+'
      } else if(c === 'Y') {
        newLine += '-FX-Y'
      } else {
        newLine += c
      }
    }

    this.lineMemory.push(newLine)

    return newLine
  }

  buildLinePoints = (currentLineString, iteration) => {
    const { lineLength } = this.props
    if(iteration === 1) return this.pointsMemory[0]

    const previousLinePoints = this.pointsMemory[iteration - 2].slice(0)
    const previousLineString = this.lineMemory[iteration - 2].slice(0)
    const newPoints = [previousLinePoints[previousLinePoints.length-2], previousLinePoints[previousLinePoints.length - 1]]

    const instructions = currentLineString.slice(previousLineString.length).split('')
    let currentDirection = iteration > 1 ? this.angleMemory[iteration - 2] : 90 // turtle angle

    for (const c of instructions) {
      const previousPointX = newPoints[newPoints.length-2]
      const previousPointY = newPoints[newPoints.length-1]

      if(c === 'F') {
        switch (currentDirection) {
          case 0: newPoints.push(previousPointX, previousPointY + lineLength)
            break
          case 90: newPoints.push(previousPointX + lineLength, previousPointY)
            break
          case 180: newPoints.push(previousPointX, previousPointY - lineLength)
            break
          case 270: newPoints.push(previousPointX - lineLength, previousPointY)
            break
          default:
            break
        }
      } else if(c === '+') {
        if(currentDirection <= 180) {
          currentDirection += 90
        } else {
          currentDirection = 0
        }
      } else if(c === '-') {
        if(currentDirection >= 90) {
          currentDirection -= 90
        } else {
          currentDirection = 270
        }
      }
    }

    const res = previousLinePoints.concat(newPoints.slice(2))

    this.pointsMemory.push(res)
    this.angleMemory.push(currentDirection)

    return res
  }

  handlePause = () => {
    // work on pause button..
    this.setState({ isPlaying: !this.state.isPlaying })
  }

  handlePlay = () => {
    this.setState({ isPlaying: true })
    this.rotate()
  }

  rotate = () => {
    this.line.attrs.rotation = 0
    this.line.to({ rotation: 90, duration: this.props.animationSpeed / 1000 })
  }

  componentDidUpdate() {
    const { isPlaying, iteration } = this.state
    const { animationSpeed } = this.props

    if(isPlaying) {
      this.timeoutID = setTimeout(() => {
        this.setState({ iteration: iteration + 1})
        this.rotate()
      }, animationSpeed)
    } else {
      clearTimeout(this.timeoutID)
    }
  }

  render() {
    const {
      height,
      width,
      strokeColor,
      controlClassnames,
      strokeWidth,
    } = this.props
    const { controlContainer, controlStart, controlReset, controlPause } = controlClassnames || {}
    const { iteration, isPlaying } = this.state
    const scale = calculateScale(iteration)
    const offsetX = (width / 2) / scale
    const offsetY = (height / 2) / scale
    const currentLineString = this.buildLineString(iteration)
    const forwardPoints = this.buildLinePoints(currentLineString, iteration)
    const { endX, endY } = buildEndPoints(forwardPoints)
    const backwardPoints = buildBackwardLine(forwardPoints, endX, endY)

    return (
      <Stage
        width={width}
        height={height}
        scaleX={scale}
        scaleY={scale}
      >
        <Portal>
          <div className={controlContainer}>
            <button className={controlStart} onClick={this.handlePlay}>Start</button>
            <button className={controlReset} onClick={this.handleReset}>Reset</button>
            {isPlaying && iteration > 1 &&
              <button className={controlPause} onClick={this.handlePause}>{this.state.isPlaying ? 'Pause' : 'Resume'}</button>
            }
          </div>
        </Portal>
        <Layer>
          <Line
            ref={node => { this.line = node }}
            x={endX + offsetX}
            y={endY + offsetY}
            points={backwardPoints}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            draggable
          />
          <Line
            x={X_ORIGIN + offsetX}
            y={Y_ORIGIN + offsetY}
            points={forwardPoints}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            draggable
          />
        </Layer>
      </Stage>
    )
  }
}

DragonCurve.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  lineLength: PropTypes.number,
  animationSpeed: PropTypes.number,
  whiteSquareColor: PropTypes.string,
  controlClassnames: PropTypes.object,
}

DragonCurve.defaultProps = {
  height: 600,
  width: 600,
  strokeColor: '#d3dee2',
  strokeWidth: 2,
  lineLength: 50,
  animationSpeed: 1000,
  controlClassnames: { controlContainer: '', controlStart: '', controlReset: '', controlPause: '' },
}

export default DragonCurve
