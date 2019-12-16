import config from '../config';
import TokenService from '../Services/TokenService';

const ProjectServices = {


  postProject(project){
    return fetch(`${config.API_ENDPOINT}/projects`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(project)
    })
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
      )
  },
  getProjectById(projectId){
    return fetch(`${config.API_ENDPOINT}/projects/${projectId}`, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      }
    })
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  },
}

export default ProjectServices;