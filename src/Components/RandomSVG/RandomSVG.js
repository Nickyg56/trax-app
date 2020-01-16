import React from 'react'
import ColorGenerator from './ColorGenerator';


class RandomSVG extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      error: null,
      size: props.size || 0
    }
    this.svg = {
      size: this.props.size,
      lineStroke: null,
      lineDirection: null,
      innerCircle1: null,
      innerCircle2: null,
    }
  }

 

  makeCenteredLines(height = 400) {
    const randomInt = Math.floor(Math.random() * 2)
    const strokeWidth = height < 50 ? .5 : 1.5
    const lineArr = []
    const lineStroke = ColorGenerator.getRandomRGB()
    this.svg.lineStroke = lineStroke;
    this.svg.lineDirection = randomInt;
    let line1;
    let line2;
    if (randomInt === 1) {
      line1 = <line key={1} x1='60%' y1='60%' x2='40%' y2='40%' stroke={lineStroke} strokeWidth={strokeWidth} />
      lineArr.push(line1)
      line2 = <line key={2} x1='40%' y1='60%' x2='60%' y2='40%' stroke={lineStroke} strokeWidth={strokeWidth} />
      lineArr.push(line2)
    } else {
      line1 = <line key={1} x1='50%' y1='35%' x2='50%' y2='65%' stroke={lineStroke} strokeWidth={strokeWidth} />
      lineArr.push(line1)
      line2 = <line key={2} x1='35%' y1='50%' x2='65%' y2='50%' stroke={lineStroke} strokeWidth={strokeWidth} />
      lineArr.push(line2)
    }
    return lineArr
  }


  makeCircles(height = 400) {
    // height comes from props
    let radius = height / 5;
    let circleArr = []
    let y1 = '25%';
    let y2 = '75%';
    let innerCircle1 = ColorGenerator.getRandomRGB()
    let innerCircle2 = ColorGenerator.getRandomRGB()
    this.svg.innerCircle1 = innerCircle1;
    this.svg.innerCircle2 = innerCircle2;
    for (let i = 0; i < 4; i++) {
      let x;
      let y;
      let innerCircle;
      if (i === 0 || i === 3) {
        x = '25%'
      } else {
        x = '75%'
      }
      if (i === 2 || i === 3) {
        innerCircle = innerCircle1
      }
      else if (i === 0 || i === 1) {
        innerCircle = innerCircle2
      }
      if (i === 0 || i === 2) {
        y = y1
      } else {
        y = y2
      }
      circleArr.push(<circle key={i} cx={x} cy={y} r={`${radius}`} fill={innerCircle} />)
    }
    
    return circleArr;
  }


  render() {

    const { size } = this.state

    const circles = this.makeCircles(size)

    const lines = this.makeCenteredLines(size)

    const rectFill = ColorGenerator.getRandomRgbBackgroundDark();
   

    return (

      <svg width={size} height={size}>

        <rect x='0' y='0' width='100%' height='100%' fill={rectFill} />
        {lines}
        {circles}
      </svg>
    )
  }
}

export default RandomSVG;