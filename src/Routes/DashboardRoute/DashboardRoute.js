import React from 'react';
import UserContext from '../../Contexts/UserContext';
import UserService from '../../Services/UserServices';
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
      joinRequests: [],
    }
  }

  fetchInitialDashboardData = async (user) => {

    try {
      const projects = await UserService.getUserProjects()
      const requests = await UserService.getUserJoinRequests(user.id)
      //requests can be used to keep track of project request statuses for the user
      console.log(projects, 'user projects and requests', requests)
      this.context.setUserProjects(projects);
  
      this.setState({
        loaded: true,
        projects,
        user,
      })
  
    } catch(e){
      console.log(e)
      this.setState({error: e.error})
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



    //probably could check if the projects are already in 
    //context and if not load them in here instead of automatically doing so.

    this.fetchInitialDashboardData(user)
    
  }



  render() {

    const { loaded, projects, user, error} = this.state;

    if(error){
    return <p>{error}</p>
    }
    if (!loaded) {
      return <p>Loading</p>
    }
    return (
      <div className='dashboard-container'>
        <Sidebar projects={projects} />
        <section className='user-info'>
          <h2>{user.name}</h2>
          <p>Total Projects: {projects.length}</p>
          <p>Email: {user.email}</p>
        </section>

        <section className='project-search-container'>
          <ProjectSearch />
        </section>

      </div>
    )
  }
}

export default DashBoardRoute;