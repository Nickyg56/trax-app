import React from 'react';
// import Sidebar from '../../Components/Sidebar/Sidebar';
import UserContext from '../../Contexts/UserContext';
import VisitorService from '../../Services/VisitorService';
import ProjectService from '../../Services/ProjectServices';
import './ProjectVisitorRoute.css';
import UserService from '../../Services/UserServices';



class ProjectVisitorRoute extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      error: null,
      loaded: false,
      project: {},
      users: [],
      userProjects: [],
      isMember: false,
      projectId: this.props.match.params.projectId || null,
      //verifies if the user has requested to join the project they are visiting yet.
      requestSent: false,
      //false means the user is a guest that is not logged into an account.
      loggedInUser: false,
    }
  }
  static contextType = UserContext;



  componentDidMount() {

    //get project info including upcoming events.
    //get list of users.
    //check if visitor has already requested to join the project.
    //redirect user if there's no projectId

    let loggedInUser = false;
    if (this.context.user.id) {
      loggedInUser = true;
      this.user = this.context.user
    }
    // if loggedInUser fetch visitor data with user id to check if a request has been sent.

    VisitorService.getVisitorData(this.state.projectId)
      .then(res => {
        if(this.user.id){
          UserService.getUserProjects()
            .then(projects => {
              let isMember = ProjectService.isUserMemberOfProject(this.state.projectId, projects)
              this.setState({
                loaded: true,
                project: res.project,
                users: res.users,
                events: res.events,
                userProjects: projects,
                loggedInUser,
                isMember,
              })
            })
        } else {
          this.setState({
            loaded: true,
            project: res.project,
            users: res.users,
            events: res.events,
            loggedInUser,
          })
        }
        
      })

  }

  handleClickJoinProject = e => {
    VisitorService.sendJoinRequest(this.state.projectId)
      .then(res => {
        this.setState({requestSent: true})
      })
  }

  makeUserItems = users => {
    if (users.length > 0) {
      return users.map((user, i) => (
        <li key={i} className='project-user-li'>
          <h4 className={'list-user-name' + (user.isAdmin ? ' admin' : '')} >{user.name}</h4>
          <p className='role'>Role: {user.role}</p>
        </li>
      )
      )
    } else {
      return <li>No User Data Available</li>
    }

  }

  makeEventItems = events => {
    if (events.length > 0) {
      return events.map((event, i) => {
        let start = new Date(event.start)
        return <li key={i} className='project-event-li'>
          <h4>{event.title}</h4>
          <p>{event.description}</p>
          <p>Created by: {event.createdBy}</p>
          <p>Date: {start.toDateString()}</p>
        </li>
      })
    } else {
      return <li className='project-event-li no-events'>No Events to Display.</li>
    }
  }

  makeJoinButton = (isMember, loggedInUser, requestSent) => {
    if(!loggedInUser){
      return ''
    } else if(isMember){
      return <p className='member-visitor-text'>You're a member of this project</p>
    } else {
      return <button 
                onClick={requestSent ? () => {} : this.handleClickJoinProject}>
                {requestSent ? 'Request Sent' : 'Join'}
              </button>
    }
  }

  render() {

    const { loaded, project, users, events, loggedInUser, requestSent, isMember } = this.state;

    if (!loaded) {
      return <p>Loading</p>
    }


    let userItems = this.makeUserItems(users)

    let eventItems = this.makeEventItems(events);

    let joinButton = this.makeJoinButton(isMember, loggedInUser, requestSent)




    return (
      <div className='project-visitor-route-container'>
        <div className='project-info-container'>
          <section className='project-info'>
            <h2>{project.title}</h2>
            {joinButton}
            <p className='project-description'>{project.description}</p>
          </section>
          <section className='project-user-info'>
            <h3>Members of {project.title}</h3>
            <ul className='project-user-list'>
              {userItems}
            </ul>
          </section>
        </div>
        <div className='events-info-container'>
          <section className='events-info'>
            <h2>Events</h2>
          <ul className='project-events-list'>
            {eventItems}
          </ul>
          </section>
          
        </div>
      </div>
    )
  }
}

export default ProjectVisitorRoute;
