import React from 'react';
import './EventSidebar.css';


class EventSidebar extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      events: this.props.events || [],
    }
  }


  sortEventsByDescendingDate(events) {
    return events.sort((a, b) => {
      if (parseInt(a.start.slice(0, 10).replace(/-/g, '')) >= parseInt(b.start.slice(0, 10).replace(/-/g, ''))) {
        return 1
      } else return -1
    })
  }

  makeEventItems = events => {
    const sortedEvents = this.sortEventsByDescendingDate(events)

    return sortedEvents.map((event, i) => {
      let date = new Date(event.start).toDateString()
      return (
        <li key={i} className='event-sidebar-list-item'>
          {event.title}
          <p className='event-list-date'>{date}</p>
        </li>
      )
    })
  }


  render() {
    const { events } = this.state;
    console.log(events)
    const eventItems = this.makeEventItems(events)
    return (
      <div className='event-sidebar-container'>
        <h3 className='event-sidebar-header'>Upcoming Events</h3>
        <ul className='event-sidebar-list'>
          {eventItems}
        </ul>
      </div>
    )
  }
}

export default EventSidebar;