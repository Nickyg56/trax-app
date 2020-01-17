import config from '../config';
import TokenService from '../Services/TokenService';

const ProjectServices = {


  postProject(project) {
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
  getProjectById(projectId) {
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
  deleteProjectById(projectId) {
    return fetch(`${config.API_ENDPOINT}/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ projectId })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res
      )
  },
  handleProjectSearch(queryString) {
    //could also pass in a limit
    return fetch(`${config.API_ENDPOINT}/projects/search?query=${queryString}`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      }
    })
    .then(res =>
      (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res
      )
  },
  isUserMemberOfProject(projectId, projectArr){

    projectId = parseInt(projectId)

    let result = projectArr.find(project => project.id === projectId)
  
    return !!result
  },
  getProjectJoinRequestsWhereUserAdmin(){
    return fetch(`${config.API_ENDPOINT}/projects/requests`, {
      method: 'GET',
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
  acceptJoinRequest(joinObj){
    return fetch(`${config.API_ENDPOINT}/projects/request/accept`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(joinObj)
    })
    .then(res =>
      (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default ProjectServices;