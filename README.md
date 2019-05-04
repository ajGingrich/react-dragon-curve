React component for a Heighway Dragon dragon curve

# React Dragon Curve

![npm version](https://img.shields.io/npm/v/react-dragon-curve.svg)
![npm Downloads](https://img.shields.io/npm/dt/react-dragon-curve.svg)
![license](https://img.shields.io/npm/l/react-dragon-curve.svg)

## Installation

```
npm install react-pgn-viewer --save

```

## Usage

Add this style or similar to your project
```
  .konvajs-content {
    border: 3px solid #e02626;
    background-color: #000814;
  }
```
then

```
import DragonCurve from 'react-dragon-curve'

class Example extends React.Component {
  render() {
    return (
      <DragonCurve
        height={600}
        width={600}
        controlClassnames={{
          controlContainer: 'button-container',
          controlStart: 'btn btn-primary',
          controlReset: 'btn btn-warning',
          controlPause: 'btn btn-warning',
        }}
        strokeWidth={2}
        strokeColor={'#d3dee2'}
        lineLength={25}
        animationSpeed={1500}
      />
    )
  }
}
```

## Properties

This library uses [react-konva](https://github.com/konvajs/react-konva) for the canvas and drawing and shares a few props.

| Prop | Type | Default | Explanation |
| --- | :---: | :------: | :-------: |
| height | number (px) | 600 | Height of background canvas |
| width | number (px) | 600 | Width of background canvas|
| strokeColor | string (hex) | '#d3dee2' | Line Color |
| strokeWidth | number (px) | 2 | Line Width |
| lineLength | number (px) | 50 | Length of each individual line |
| animationSpeed | number (ms) | 1000 | Animation duration in between each iteration in ms |
| controlClassnames | object | { controlContainer: '', controlStart: '', controlReset: '', controlPause: '' } | classnames for the control buttons |

## Demo

To be added

## Contributing

To run the example:

```
npm install
npm run build
npm run dev
```

Then open `localhost:8000` in a browser.

Tested with React 16.6
