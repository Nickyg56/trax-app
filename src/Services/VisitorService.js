import config from '../config';
import TokenService from './TokenService';


const VisitorService = {
  getVisitorData(projectId){
    return fetch(`${config.API_ENDPOINT}/visitor/${projectId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  },
  sendJoinRequest(projectId){
    //throw error if no user id here
    return fetch(`${config.API_ENDPOINT}/visitor/${projectId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },      
    }).then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json())
  }
}

export default VisitorService;