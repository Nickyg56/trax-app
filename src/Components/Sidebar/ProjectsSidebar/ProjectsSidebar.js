import React from 'react';
import ProjectServices from '../../../Services/ProjectServices';
import ProjectForm from '../../ProjectForm/ProjectForm';
import { Link } from 'react-router-dom';
import UserContext from '../../../Contexts/UserContext';
import './ProjectsSidebar.css';

class ProjectsSideBar extends React.Component {

  static contextType = UserContext;

  constructor(props){
    super(props)
    this.state = {
      error: null,
      projects: this.props.projects || [],
      showProjectForm: false,
      currIndex: this.props.currIndex,
    }
  }
  

  toggleProjectForm = () => {
    let showProjectForm = this.state.showProjectForm;
    this.props.toggleProjectForm(showProjectForm)
    this.setState({
      showProjectForm: !showProjectForm
    })
  }


  componentDidMount(){
    if(!this.state.currIndex){
      this.setState({ currIndex: this.context.projectIndex})
    }
  }


  setLocalActiveIndex = i => {
    this.setState({currIndex: i})
    this.context.setProjectIndex(i)
  }
  

  onSubmitProject = ev => {
    ev.preventDefault();
    const { title, description, role } = ev.target;
    ProjectServices.postProject({
      title: title.value,
      description: description.value,
      role: role.value
    })
      .then(res => {
        const newProjects = [...this.state.projects, res]
        this.context.setUserProjects(newProjects)
        this.setState({
          projects: newProjects,
          showProjectForm: false,
        })
      })

  }


  makeProjectOptions = projectsArr => {
    if (projectsArr.length <= 0) {
      return <p>No projects to display</p>
    }
    return projectsArr.map((project, i) => {

      return (
        <li key={i} onClick={() => this.setLocalActiveIndex(i)} className={'project-list-item ' + (this.state.currIndex === i ? 'current-project' : 'inactive-project')}>
          <Link
            to={`/projects/${project.id}`}
            className='project-list-link'>
              {project.title}
          </Link>
        </li>
      )
    })
  }


  render() {
    const { projects, showProjectForm } = this.state;
    const projectItems = this.makeProjectOptions(projects)

    return (
      <nav className='projects-sidebar'>
        <ul className='projects-nav-list'>
          {projectItems}
        </ul>
        {showProjectForm && <ProjectForm onSubmitProject={this.onSubmitProject} toggleProjectForm={this.props.toggleProjectForm}/>}
        <button className={'project-button' + (showProjectForm ? ' cancel-button' : '')} onClick={this.toggleProjectForm}>{showProjectForm ? 'Cancel' : 'Add Project'}</button>
      </nav>
    )
  }


}

export default ProjectsSideBar;