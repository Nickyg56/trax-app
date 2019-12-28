import React from 'react';
import moment from 'moment';
import DayEditor from '../../Components/DayEditor/DayEditor';
import EventService from '../../Services/EventServices';
import CalendarDay from './CalendarDay';
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
      dayMenuIndex: null,
      unavialableDays: [],
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
    EventService.getUnavailableDaysForMonth(
      (monthNum + 1),
      this.year(),
      this.state.projectId)
      .then(dayArr => {
        this.setState({
          dateContext,
          unavialableDays: dayArr,
        })
      }).catch(e => {
        this.setState({ error: e.message })
      })

  }

  onSelectChangeMonth = (e, data) => {
    this.setMonth(data)
    this.setState({ unavialableDays: [] })
  }

  SelectList = props => {
    let popup = props.data.map(data => {
      return (
        <a href='#'
          key={data}
          className='month-link'
          onClick={(e) => { this.onSelectChangeMonth(e, data) }}>
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
        onClick={(e) => { this.onChangeMonth(e, this.month()) }}>
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
    if (e.which === 13 || e.which === 27) {
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
          ref={yearInput => { this.yearInput = yearInput }}
          onKeyUp={e => { this.onKeyUpYear(e) }}
          onChange={e => { this.onYearChange(e) }}
          type='number'
          placeholder='year'
        />
        :
        <span
          className='label-year'
          onDoubleClick={(e) => { this.showYearEditor() }}>
          {this.year()}
        </span>

    )
  }

  DayOptionMenu = (day, isDayUnavailable) => {
    return (
      <ul className='day-options-container'>
        <li onClick={() => this.toggleMarkDayUnavailable(day, isDayUnavailable)}>{isDayUnavailable ? 'Available' : 'Unavailable'}</li>
        <li onClick={(e) => this.openDayEditor(e, day)}>Details</li>
      </ul>
    )
  }


  openDayEditor = (e, data) => {
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

  validateMonthAndYear = () => {
    if (this.state.today.month() !== this.state.dateContext.month()) {
      return false;
    } else if (this.state.today.year() !== this.state.dateContext.year()) {
      return false
    } else return true
  };


  componentDidMount() {

    // get all events with this project id and set state with info

  }



  isDayPassed = (d) => {
    if (parseInt(this.year()) < parseInt(this.state.today.format('Y'))) {
      return true;
    }
    if (parseInt(this.year()) > parseInt(this.state.today.format('Y'))) {
      return false;
    }
    if (parseInt(this.state.dateContext.format('M')) < parseInt(this.state.today.format('M'))) {
      return true;
    }
    if (d < parseInt(this.currentDay()) && (this.state.dateContext.format('M') === this.state.today.format('M'))) {
      return true;
    } else return false
  }


  handleSubmitEvent = (e, day, month, year) => {
    e.preventDefault();
    const { title, description, startTime, endTime } = e.target
    const { projectId } = this.state;

    console.log(day, month, year)
    EventService.postProjectEvent({
      title: title.value,
      description: description.value,
      startTime: startTime.value,
      endTime: endTime.value,
      day,
      month,
      year,
    }, projectId)
      .then(res => console.log(res))
  }

  toggleMarkDayUnavailable = (day, isDayUnavailable) => {
    const { projectId } = this.state;
    const currUnavailable = this.state.unavialableDays;

    const monthNum = this.months.indexOf(this.month()) + 1;
    const formattedDate = moment(`${monthNum}/${day}/${this.year()}`, 'MM/DD/YYYY').format().slice(0, 10);

    let newUnavailable;
    if (isDayUnavailable) {
      newUnavailable = currUnavailable.filter(d => d !== day);
    } else {
      EventService.markDateUnavailable(projectId, { date: formattedDate })
        .then(res => {
          console.log(res);
        })
      newUnavailable = [...currUnavailable, day]
    }
    this.setState({ unavialableDays: newUnavailable })
  }

  toggleOptionMenu = (e, d) => {
    if (d === this.state.dayMenuIndex) {
      d = null;
    }
    this.setState({ dayMenuIndex: d })
  }


  render() {

    let weekdays = this.weekdaysShort.map(day => {
      return (
        <td key={day} className='week-day'>{day}</td>
      )
    })

    let blankDays = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blankDays.push(<td key={i * 33} className='blank-days'>{''}</td>)
    }



    let daysInMonth = [];
    for (let d = 1; d < (this.daysInMonth() + 1); d++) {
      let currDayInteger = parseInt(this.currentDay())
      let classes = ((d === currDayInteger && this.validateMonthAndYear()) ? 'day current-day' : 'day');
      let menuOpen = this.state.dayMenuIndex === d ? true : false;
      let isDayPassed = this.isDayPassed(d);
      let isDayUnavailable = false;
      if (this.state.unavialableDays.includes(d)) {
        classes += ' unavailable';
        isDayUnavailable = true;
      }
      daysInMonth.push(
        <CalendarDay
          key={d}
          classes={classes}
          isDayPassed={isDayPassed}
          isDayUnavailable={isDayUnavailable}
          menuOpen={menuOpen}
          d={d}
          openDayEditor={this.openDayEditor}
          toggleOptionMenu={this.toggleOptionMenu}
          DayOptionMenu={this.DayOptionMenu}
        />
      )
    }



    let totalSlots = [...blankDays, ...daysInMonth];
    let rows = [];
    let cells = [];


    totalSlots.forEach((day, i) => {
      if ((i % 7) !== 0) {
        cells.push(day)
      } else {
        let insertRow = cells.slice();
        rows.push(insertRow);
        cells = [];
        cells.push(day)
      }
      if (i === totalSlots.length - 1) {
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
    })

    let trElems = rows.map((d, i) => {
      return (
        <tr key={i * 10}>{d}</tr>
      )
    })

    if (this.state.showDayEditor) {
      return (
        <div className='calendar-container'>
          <h2>Calendar</h2>
          <DayEditor
            day={this.state.dayCurrentlyEditing}
            month={this.month()}
            year={this.year()}
            exitDayEditor={this.exitDayEditor}
            handleSubmitEvent={this.handleSubmitEvent} />
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