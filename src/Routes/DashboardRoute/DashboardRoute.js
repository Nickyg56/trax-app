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
      user: {}
    }
  }


  componentDidMount() {

    this.context.setProjectIndex(null)
    //probably could check if the projects are already in 
    //context and if not load them in here instead of automatically doing so.
    UserService.getUserProjects()
      .then(res => {
        this.context.setUserProjects(res);
        const user = {
          name: this.context.user.full_name,
          email: this.context.user.email
        }
        this.setState({
          loaded: true,
          projects: res,
          user,
        })
      })
  }



  render() {

    const { loaded, projects } = this.state;
    const { name, email } = this.state.user;

    if (!loaded) {
      return <p>Loading</p>
    }
    return (
      <div className='dashboard-container'>
        <Sidebar projects={projects} />
        <section className='user-info'>
          <h2>{name}</h2>
          <p>Total Projects: {projects.length}</p>
          <p>Email: {email}</p>
        </section>

      <section className='project-search-container'>
      <ProjectSearch />
      </section>
        
      </div>
    )
  }
}

export default DashBoardRoute;