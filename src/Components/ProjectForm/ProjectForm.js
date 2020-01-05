import React from 'react';

class ProjectForm extends React.Component {

  //use state to keep track of inputs with onChange handler

  componentDidMount(){

  }

  render() {
    return (
      <form className='project-form' onSubmit={this.props.onSubmitProject}>
        <div className='project-form-item'>
        <label htmlFor='project-title'>Title: </label>
        <input
          type='text'
          name='title'
          id='project-title'
          required
        />
        </div>
        <div className='project-form-item'>
        <label htmlFor='project-description'>Description: </label>
        <textarea
          
          name='description'
          id='project-description'
          required
        />
        </div>
        <div className='project-form-item'>
        <label htmlFor='project-role'>Your Role: </label>
        <input
          type='text'
          name='role'
          id='project-role'
          required
        />
        </div>
        <button className='project-button' type='submit'>Start Project</button>

      </form>
    )
  }

}


export default ProjectForm;