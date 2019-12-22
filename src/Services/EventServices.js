import config from '../config';
import TokenService from './TokenService';


const EventService = {

  postProjectEvent(event, projectId){
    return fetch(`${config.API_ENDPOINT}/events/${projectId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(event)
    })
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
      )
  },
  getProjectEventsByMonth(projectId, month){
    return fetch(`${config.API_ENDPOINT}/events/${projectId}?month=${month}`, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  },
}

export default EventService;