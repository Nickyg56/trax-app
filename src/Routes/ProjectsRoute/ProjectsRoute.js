import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';
import UserContext from '../../Contexts/UserContext';
import ProjectServices from '../../Services/ProjectServices';
import UserService from '../../Services/UserServices';
import EventService from '../../Services/EventServices';
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
      events: [],
    }
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


  render() {
    const { loaded, currentProject, events } = this.state;
    console.log(currentProject)

    let eventItems;

    if (events.length > 0) {
      eventItems = this.formatEvents(events)
    }

    if (!loaded) {
      return <p>Loading...</p>
    }

    return (
      <div className='projects-route-container'>
        <Sidebar projects={this.context.userProjects} currIndex={this.state.currIndex} isOpen={true}/>
        <section className='project-info'>
          <h2 className='project-title'>{currentProject.title}</h2>
          <p>Your Role: {currentProject.role}</p>
          <p className='project-description'>Project Description: {currentProject.description}</p>
        </section>
        <Link to={`/calendar/project/${currentProject.id}`}>View Calendar for {currentProject.title} </Link>
        <section className='project-events-info'>
          <h3>Events</h3>
          <ul className='event-list-container'>
            {eventItems}
          </ul>
        </section>
      </div>
    )
  }

}

export default ProjectsRoute;