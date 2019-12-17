import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';
import UserContext from '../../Contexts/UserContext';
import ProjectServices from '../../Services/ProjectServices';
import UserService from '../../Services/UserServices';



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
    }
  }


  componentDidMount() {

    if(!this.state.currIndex && this.context.projectIndex){
      this.setState({
        currIndex: this.context.projectIndex
      })
    }
    if(this.context.userProjects.length <= 0){
      UserService.getUserProjects()
        .then(res => {
          this.context.setUserProjects(res)
        })
    }
    if(!this.state.currentProject.title){
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
      .catch(res => {
        this.setState({ error: res.error })
      })
      
    }  else {
      this.setState({
        loaded: true,
      })
    }
  }

  componentDidUpdate(prevProps){
    let { projectId } = this.props.match.params;
    if(projectId !== prevProps.match.params.projectId){
      ProjectServices.getProjectById(projectId)
      .then(res => {
        this.setState({
          currentProject: res.project,
          users: res.users,
          loaded: true,
          projectId
        })
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
    }

  }


  render() {
    const { loaded, currentProject} = this.state;
    console.log(currentProject)


    if(!loaded){
      return <p>Loading...</p>
    }

    return (
      <div className='projects-route-container'>
        <Sidebar projects={this.context.userProjects} currIndex={this.state.currIndex}/>
        <section className='project-section'>
          <h2 className='project-title'>{currentProject.title}</h2>
          <p className='project-description'>{currentProject.description}</p>
          <Link to={`/calendar/project/${currentProject.id}`}>View Calendar</Link>
        </section>
      </div>
    )
  }

}

export default ProjectsRoute;