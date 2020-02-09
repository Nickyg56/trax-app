import React from 'react';
import './ProjectJoinForm.css';

function ProjectJoinForm(props) {

  return (
    <div className='join-modal-container'>
      <div className='join-modal'>
        <div className='project-join-form-container'>
          <form className='project-join-form' onSubmit={props.handleSubmitJoinForm}>
            <textarea
              className='form-text-area'
              name='message'
              placeholder='enter message (max 150 char)'
              maxLength='150'
            />
            <button type='submit' className='form-join-button'>Join</button>
            <button onClick={props.handleCancelJoin} className='form-cancel-button'>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  )
}


export default ProjectJoinForm;