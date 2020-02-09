import React from 'react';
import UserContext from '../../Contexts/UserContext';
import UserService from '../../Services/UserServices';
import ProjectService from '../../Services/ProjectServices';
import Sidebar from '../../Components/Sidebar/Sidebar';
import ProjectSearch from '../../Components/ProjectSearch/ProjectSearch';
import './DashboardRoute.css';


class DashBoardRoute extends React.Component {

  static contextType = UserContext;

  constructor(props) {
    super(props)
    this.state = {
      error: null,
      loaded: false,
      projects: null,
      user: {},
      projectRequests: [],
      currentRequestData: null,
      showAcceptUserModal: false,
      isUserSearching: false,
    }
  }

  fetchInitialDashboardData = async (user) => {

    try {
      const projects = await UserService.getUserProjects()
      const userRequests = await UserService.getUserJoinRequests(user.id)
      //userRequests can be used to keep track of project request statuses for the user
      const projectRequests = await ProjectService.getProjectJoinRequestsWhereUserAdmin()
      console.log(projectRequests);
      this.context.setUserProjects(projects);

      this.setState({
        loaded: true,
        projects,
        user,
        projectRequests,
      })

    } catch (e) {
      console.log(e)
      this.setState({ error: e.error })
    }

  }


  componentDidMount() {

    this.context.setProjectIndex(null)
    const user = {};

    if (this.props.user) {
      user.id = this.props.user.id
      user.name = this.props.user.full_name
      user.email = this.props.user.email
    } else {
      user.id = this.context.user.id
      user.name = this.context.user.fullName
      user.email = this.context.user.email
    }


    this.fetchInitialDashboardData(user)
  }

  setIsUserSearching = () => {
    this.setState({
      isUserSearching: !this.state.isUserSearching,
    })
  }


  handleAcceptRequest = (userId, projectId) => {
    console.log('handle accept ran')
    const requestData = {
      userId,
      projectId
    }
    this.setState({
      currentRequestData: requestData,
      showAcceptUserModal: true
    })
  }

  submitAcceptUser = e => {
    e.preventDefault();
    const { role } = e.target;
    const { userId, projectId } = this.state.currentRequestData
    console.log(role.value, userId, projectId)
    //need isAdmin as well!!!!!

    ProjectService.acceptJoinRequest({
      role: role.value,
      userId,
      projectId
    })
      .then(() => {
        role.value = ''
        this.setState({
          showAcceptUserModal: false,
          currentRequestData: null,
        })
      })

  }

  exitAcceptUserModal = () => {
    this.setState({
      showAcceptUserModal: false,
      currentRequestData: null,
    })
  }

  makeProjectRequestItems = (requests) => {

    let listItems = [];

    for (let i = 0; i < requests.length; i++) {
      let header = <h4 className='join-request-project'>{requests[i][0]}</h4>
      let items = requests[i][1].map((joinRequest, index) => {
        return (
          <div key={index} className='join-request-content'>
            <h5 className='join-request-name'>From: {joinRequest.userName}</h5>
            <p>Message: {joinRequest.message}</p>
            <span className='join-request-buttons'>
            <button
              className='accept-button'
              onClick={() => this.handleAcceptRequest(joinRequest.userId, joinRequest.projectId)}>
              Accept
              </button>
            <button
              className='reject-button'
              onClick={() => this.handleRejectRequest(joinRequest.userId, joinRequest.projectId)}>
              Reject
              </button>
            </span>
          </div>)
      })
      listItems.push(<li key={i} className='join-request-item'>{header}{items}</li>)
    }


    return listItems;

  }



  render() {

    const { loaded, projects, user, error, projectRequests, showAcceptUserModal, isUserSearching } = this.state;


    let acceptUserModal;
    if (showAcceptUserModal) {
      acceptUserModal = (
        <div className='request-modal-container'>
          <div className='request-modal'>
            <form onSubmit={this.submitAcceptUser}>
              <input
                type='text'
                id='accept-role'
                name='role'
                placeholder='enter role'
              />
              <button type='submit'>Accept</button>
              <button onClick={this.exitAcceptUserModal}>Cancel</button>
            </form>
          </div>
        </div>)
    }

    if (error) {
      return <p>{error}</p>
    }
    if (!loaded) {
      return <p>Loading</p>
    }
    return (
      <div className='dashboard-container'>
        <Sidebar projects={projects} />
        {showAcceptUserModal && acceptUserModal}
        <section className='user-info'>
          <h2>{user.name}</h2>
          <p>Total Projects: {projects.length}</p>
          <p>Email: {user.email}</p>
        </section>

        <div className='dashboard project-info-container'>
          <section className={'project-search-container' + (isUserSearching ? ' active' : '')}>
            <ProjectSearch
              setIsUserSearching={this.setIsUserSearching}
              isUserSearching={isUserSearching}
            />
          </section>

          <section className='project-join-requests-container'>
            <h3 className='project-request-section-header'>Project Requests</h3>
            <ul className='project-join-requests-list'>
              {this.makeProjectRequestItems(projectRequests)}
            </ul>
          </section>
        </div>


      </div>
    )
  }
}

export default DashBoardRoute;