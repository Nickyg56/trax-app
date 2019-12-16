import React from 'react';

class ProjectsDisplay extends React.Component {

  
  state = {
    error: null,
    projects: this.props.projects || [],
  }


  render(){
    const { projects } = this.state;

    return (
      <div className='projects-display-container'>
        {projects.length > 0
        ? <p>{projects[0].title}</p> 
        : <p>No projects to display</p>
        }
      </div>
    )
  }



}

export default ProjectsDisplay;