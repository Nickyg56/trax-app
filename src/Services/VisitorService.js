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
  sendJoinRequest(projectId, message){
    return fetch(`${config.API_ENDPOINT}/visitor/${projectId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({message})      
    }).then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json())
  }
}

export default VisitorService;