import React from 'react';
import './DayEditor.css';

class DayEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      day: this.props.day || null,
      month: this.props.month || null,
      year: this.props.year || null,
      showEventForm: false,
    }
  }

  openEventForm = () => {
    this.setState({ showEventForm: true })
  }

  closeEventForm = () => {
    this.setState({ showEventForm: false })
  }

  

  render() {
    const { showEventForm, day, month, year } = this.state
    console.log(showEventForm);
    return (
      <div className='day-editor-container'>
        <p>{`The date is ${month} ${day}, ${year}`}</p>
        <div className='event-form-container'>
          {showEventForm ?
            <form className='event-form' onSubmit={(e, d, m, y) => this.props.handleSubmitEvent(e, day, month, year)}>
              <div className='event-form-row'>
                <label htmlFor='event-title-input'>Title: </label>
                <input
                  name='title'
                  type='text'
                  id='event-title-input'
                  required
                />
              </div>
              <div className='event-form-row'>
                <label htmlFor='event-description-input'>Description:</label>
                <textarea
                  name='description'
                  id='event-description-input'
                  required
                />
              </div>
              {/* make start and end time optional defaulting to an "all day" event */}
              <div className='event-form-row'>
                <label htmlFor='event-start-time-input'>Start time: </label>
                <input
                  type='time'
                  name='startTime'
                  id='event-start-time-input'
                  required
                />
              </div>
              <div className='event-form-row'>
                <label htmlFor='event-end-time-input'>End time: </label>
                <input
                  type='time'
                  name='endTime'
                  id='event-end-time-input'
                  required
                />
              </div>
              <div className='event-form-buttons'>
                <button type='submit' className='event-submit-button'>Add Event</button>
                <button onClick={this.closeEventForm}>Close</button>
              </div>
            </form>
            :
            <button onClick={this.openEventForm}>Click to add an event</button>
          }



        </div>

        <button onClick={this.props.exitDayEditor}>Go Back</button>
      </div>

    )
  }
}

export default DayEditor