import React from 'react';
import moment from 'moment';
import DayEditor from '../../Components/DayEditor/DayEditor';
import './Calendar.css';


class Calendar extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.projectId,
      loaded: false,
      dateContext: moment(),
      today: moment(),
      showMonthPopup: false,
      showYearEditor: false,
      showDayEditor: false,
      dayCurrentlyEditing: null,
    }
  }

  weekdays = moment.weekdays();
  weekdaysShort = moment.weekdaysShort();
  months = moment.months();

  year = () => {
    return this.state.dateContext.format('Y');
  }
  month = () => {
    return this.state.dateContext.format('MMMM');
  }
  daysInMonth = () => {
    return this.state.dateContext.daysInMonth();
  }
  currentDate = () => {
    return this.state.dateContext.get('date');
  }
  currentDay = () => {
    return this.state.dateContext.format('D');
  }
  firstDayOfMonth = () => {
    let dateContext = this.state.dateContext;
    let firstDay = moment(dateContext).startOf('month').format('d');
    return firstDay;
  }

  onChangeMonth = (e, month) => {
    this.setState({
      showMonthPopup: !this.state.showMonthPopup
    })
  }

  setMonth = month => {
    let monthNum = this.months.indexOf(month)
    let dateContext = Object.assign({}, this.state.dateContext)
    dateContext = moment(dateContext).set('month', monthNum)
    this.setState({
      dateContext
    })
  }

  onSelectChangeMonth = (e, data) => {
    this.setMonth(data)
  }

  SelectList = props => {
    let popup = props.data.map(data => {
      return (
          <a href='#'
            key={data}
            className='month-link'
            onClick={(e) => {this.onSelectChangeMonth(e, data)}}>
            {data}
          </a>
      )
    })
    return (
      <div className='month-popup'>
        {popup}
      </div>
    )
  }

  MonthNav = () => {
    return (
      <span className='label-month'
        onClick={(e) => {this.onChangeMonth(e, this.month())}}>
        {this.month()}
        {this.state.showMonthPopup && <this.SelectList data={this.months} />}
      </span>
    )
  }

  showYearEditor = () => {
    this.setState({
      showYearEditor: true
    })
  }

  onKeyUpYear = e => {
    if (e.which === 13 || e.which === 27){
      this.setYear(e.target.value)
      this.setState({
        showYearEditor: false,
      })
    }
  }

  setYear = year => {
    let dateContext = Object.assign({}, this.state.dateContext)
    dateContext = moment(dateContext).set('year', year);
    this.setState({
      dateContext
    })
  }

  onYearChange = e => {
    this.setYear(e.target.value)
  }

  YearNav = () => {
    return (
      this.state.showYearEditor ?
      <input 
      defaultValue={this.year()}
      className='year-editor'
      ref={yearInput => { this.yearInput = yearInput}}
      onKeyUp={e => { this.onKeyUpYear(e)}}
      onChange={e => { this.onYearChange(e)}}
      type='number'
      placeholder='year'
      />
      :
      <span 
        className='label-year'
        onDoubleClick={(e) => {this.showYearEditor()}}>
        {this.year()}
      </span>
      
    )
  }


  onDayDoubleClick = (e , data) => {
   this.setState({
    showDayEditor: true,
    dayCurrentlyEditing: data,
   })
  }

  exitDayEditor = () => {
    this.setState({
      showDayEditor: false,
      dayCurrentlyEditing: null,
    })
  }
  

  componentDidMount() {
    console.log(this.state.projectId)
    // get all events with this project id and set state with info
  }





  render() {

    let weekdays = this.weekdaysShort.map(day => {
      return (
        <td key={day} className='week-day'>{day}</td>
      )
    })

    let blankDays = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++){
      blankDays.push(<td key={i * 33} className='blank-days'>{''}</td>)
    }

    

    let daysInMonth = [];
    for (let d = 1; d < (this.daysInMonth() + 1); d++){
      let className = (d == this.currentDay() ? 'day current-day' : 'day');
      daysInMonth.push(
        <td key={d} onDoubleClick={e => {this.onDayDoubleClick(e, d)}} className={className}><span>{d}</span></td>
      )
    }

    

    let totalSlots = [...blankDays, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if((i % 7) !== 0) {
        cells.push(row)
      } else {
        let insertRow = cells.slice();
        rows.push(insertRow);
        cells = [];
        cells.push(row)
      }
      if(i === totalSlots.length - 1){
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
    })

    let trElems = rows.map((d, i) => {
      return (
        <tr key={i * 10}>{d}</tr>
      )
    })

    if(this.state.showDayEditor){
      return (
        <div className='calendar-container'>
          <h2>Calendar</h2>
          <DayEditor 
            day={this.state.dayCurrentlyEditing} 
            month={this.month()} 
            year={this.year()}
            exitDayEditor={this.exitDayEditor}/>
        </div>
      )
    }

    return (
      <div className='calendar-container'>
        <h2>Calendar</h2>
        <table className='calender'>
          <thead>
            <tr className='calendar-header'>
              <td colSpan='7' className='month-header'>
                <this.MonthNav />
                {' '}
                <this.YearNav />
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className='weekday-headers'>{weekdays}</tr>
            {trElems}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Calendar;