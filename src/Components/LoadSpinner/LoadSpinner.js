import React from 'react';
import './LoadSpinner.css';


function LoadSpinner(props){


  return (
    <svg className='load-spinner' width={props.width} height={props.height}>
      <rect x='0' y='0'  />
      <circle cx='50%' cy='50%' r={props.width * .35}/>
      <circle cx='50%' cy='50%' r={props.width * .27}/>
      <circle cx='50%' cy='50%' r={props.width * .19}/>
      <circle cx='50%' cy='50%' r={props.width * .11}/>
      <circle className='inner-circle' cx='50%' cy='50%' r={props.width * .04}/>



    </svg>
  )
}

export default LoadSpinner;