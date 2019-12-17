import React from 'react';
import './DayEditor.css';

class DayEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      day: this.props.day || null,
      month: this.props.month || null,
      year: this.props.year || null,
    }
  }

  render() {
    return (
      <div className='day-editor-container'>
        <p>{`The date is ${this.state.month} ${this.state.day}, ${this.state.year}`}</p>
        <button onClick={this.props.exitDayEditor}>Go Back</button>
      </div>

    )
  }
}

export default DayEditor