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


  render() {
    const { loaded, currentProject, events } = this.state;
    console.log(currentProject)

    let eventItems;

    if (events.length > 0) {
      eventItems = events.map((event, i) => {
        return (
          <li key={i} className='event-item'>
            <h4>{event.title}</h4>
            <p>{event.description}</p>
          </li>

        )
      })
    }


    if (!loaded) {
      return <p>Loading...</p>
    }

    return (
      <div className='projects-route-container'>
        <Sidebar projects={this.context.userProjects} currIndex={this.state.currIndex} />
        <section className='project-section'>
          <h2 className='project-title'>{currentProject.title}</h2>
          <p className='project-description'>{currentProject.description}</p>
          <Link to={`/calendar/project/${currentProject.id}`}>View Calendar for {currentProject.title} </Link>
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