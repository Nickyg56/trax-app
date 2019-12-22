import React from 'react';

function CalendarDay(props) {

  if(props.isDayPassed){
    return (
      <td key={props.d} onDoubleClick={e => { props.openDayEditor(e, props.d) }} className='day day-passed'>
          <div className='day-header'>
            <span className='day-content'>{props.d}</span>
          </div>
          <div className={props.menuOpen ? 'day-option-menu open': 'day-option-menu'}
            onClick={e => { props.toggleOptionMenu(e, props.d) }}>
            <span>...</span>
            {props.menuOpen ? props.DayOptionMenu(props.d) : null}
          </div>

        </td>
    )
  }
  return (
    <td key={props.d} onDoubleClick={e => { props.openDayEditor(e, props.d) }} className={props.classes}>
          <div className='day-header'>
            <span className='day-content'>{props.d}</span>
          </div>
          <div className={props.menuOpen ? 'day-option-menu open': 'day-option-menu'}
            onClick={e => { props.toggleOptionMenu(e, props.d) }}>
            <span>...</span>
            {props.menuOpen ? props.DayOptionMenu(props.d) : null}
          </div>

        </td>
  )
}


export default CalendarDay;