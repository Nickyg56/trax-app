import React from 'react';
// import { Link } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';
import UserContext from '../../Contexts/UserContext';
import ProjectServices from '../../Services/ProjectServices';
import UserService from '../../Services/UserServices';
import EventService from '../../Services/EventServices';
import Calendar from '../../Components/Calendar/Calendar';
import LoadSpinner from '../../Components/LoadSpinner/LoadSpinner';
import RandomSVG from '../../Components/RandomSVG/RandomSVG';
import './ProjectsRoute.css';



class ProjectsRoute extends React.Component {


  static contextType = UserContext;


  constructor(props) {
    super(props)
    this.state = {
      error: null,
      loaded: false,
      users: [],
      currentProject: {},
      projectId: null,
      currIndex: null,
      showCalendar: false,
      events: [],
      isDeleting: false,
    }
  }


  toggleCalendarVisible = () => {
    this.setState({showCalendar: !this.state.showCalendar})
  }


  componentDidMount() {

    if (!this.state.currIndex && this.context.projectIndex) {
      this.setState({
        currIndex: this.context.projectIndex
      })
    }
    if (this.context.userProjects.length <= 0) {
      UserService.getUserProjects()
        .then(res => {
          this.context.setUserProjects(res)
        })
    }
    if (!this.state.currentProject.title) {
      let { projectId } = this.props.match.params;
      ProjectServices.getProjectById(projectId)
        .then(res => {
          this.setState({
            currentProject: res.project,
            users: res.users,
            loaded: true,
            projectId
          })
        })
        .then(() => {
          EventService.getProjectEventsByProjectId(projectId)
            .then(res => {
              console.log('events', res)
              this.setState({
                events: res,
              })
            })
        })
        .catch(res => {
          this.setState({ error: res.error })
        })

    } else {
      this.setState({
        loaded: true,
      })
    }
  }

  componentDidUpdate(prevProps) {
    let { projectId } = this.props.match.params;
    if (projectId !== prevProps.match.params.projectId) {
      ProjectServices.getProjectById(projectId)
        .then(res => {
          this.setState({
            currentProject: res.project,
            users: res.users,
            loaded: true,
            projectId,
            events: []
          })
        })
        .then(() => {
          EventService.getProjectEventsByProjectId(projectId)
            .then(res => {
              console.log('events', res)
              this.setState({
                events: res,
              })
            })
        })
        .catch(res => {
          this.setState({ error: res.error })
        })
    }

  }

  sortEventsByDescendingDate(events) {
    // console.log('SORT', parseInt(events[0].start.slice(0, 10).replace(/-/g, '')) > parseInt(events[1].start.slice(0, 10).replace(/-/g, '')))
    return events.sort((a, b) => {
      if (parseInt(a.start.slice(0, 10).replace(/-/g, '')) > parseInt(b.start.slice(0, 10).replace(/-/g, ''))) {
        return 1
      } else return -1
    })
  }

  formatEvents(events) {
    const sortedEvents = this.sortEventsByDescendingDate(events)
    return sortedEvents.map((event, i) => {
      let start = new Date(event.start)
      let end = new Date(event.end)
      let startTime = start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      let endTime = end.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

      return (
        <li key={i} className='event-item'>
          <h4>{event.title}</h4>
          <h5>Created by: {event.createdBy}</h5>
          <p>Event Date: {start.toDateString()}</p>
          <p>
            From {startTime} to {endTime}
          </p>
          <p>{event.description}</p>
        </li>
      )
    })
  }

  handleDeleteProject = e => {
    this.setState({ isDeleting: true })
  }

  cancelDeleteProject = e => {
    this.setState({ isDeleting: false })
  }

  deleteProject = e => {
    const id = this.state.currentProject.id;

    ProjectServices.deleteProjectById(id)
      .then(() => {
        // this.setState({isDeleting: false})
        const { history } = this.props
        history.push('/dashboard')
      })
  }


  render() {
    const { loaded, currentProject, events, isDeleting, showCalendar } = this.state;
    console.log(currentProject)

    const { history } = this.props
    console.log(history)
    let eventItems;


    if (events.length > 0) {
      eventItems = this.formatEvents(events)
    } else {
      eventItems = <li className='event-item'>
        <p>No events have been added to this project. <br/> Add events from the calendar</p>
    </li>
    }

    let deleteConfirmation;
    if (isDeleting) {
      deleteConfirmation =
        <div className='project-delete-confirmation'>
          <p>Are you sure you would like to delete this project?</p>
          <button onClick={this.deleteProject}>Delete</button>
          <button onClick={this.cancelDeleteProject}>Cancel</button>
        </div>

    }

    if (!loaded) {
      return <LoadSpinner width={500} height={500} />
    }

    return (
      <div className='projects-route-container'>
        <Sidebar projects={this.context.userProjects} currIndex={this.state.currIndex} isOpen={true} />
        <div className='project-summary-container'>
        <section className='project-summary'>
          <span className='project-summary-header'>
          <h2 className='project-title'>{currentProject.title}</h2>
          <button onClick={this.toggleCalendarVisible} className='project-calendar-button'>Calendar</button>
          </span>
          <p>Your Role: {currentProject.role}</p>
          <p className='project-description'>Project Description: {currentProject.description}</p>
          {isDeleting ? deleteConfirmation : ''}
          {currentProject.isAdmin ? !isDeleting ? <button onClick={this.handleDeleteProject} className='project-delete-button'>Delete Project</button> : '' : ''}
        </section>
        </div>
        {showCalendar && <div className='modal-container'>
          <div className='modal'>
            <div className='exit-modal' onClick={this.toggleCalendarVisible}>X</div>
          <Calendar projectId={currentProject.id} title={currentProject.title}/>
            </div></div>}
        <div className='project-info-container'>
          <section className='project-events-info'>
            <h3>Events</h3>
            <ul className='event-list-container'>
              {eventItems}
            </ul>
          </section>
          <section className='project-placeholder-section'>
          {/* <RandomSVG size={400}/> */}
          <LoadSpinner width={400} height={400}/>
          </section>
        </div>
      </div>
    )
  }

}

export default ProjectsRoute;