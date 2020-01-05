import config from '../config';
import TokenService from './TokenService';


const EventService = {

  postProjectEvent(event, projectId) {
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
  getProjectEventsByProjectId(projectId){
    return fetch(`${config.API_ENDPOINT}/events/${projectId}`, {
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
  getEventsByUserId(userId){
    return fetch(`${config.API_ENDPOINT}/events/user_events/${userId}`, {
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
  getProjectEventsByMonth(projectId, month, year) {
    return fetch(`${config.API_ENDPOINT}/events/calender/${projectId}?year=${year}&month=${month}`, {
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
  markDateUnavailable(projectId, date) {
    console.log('DATE', date)
    return fetch(`${config.API_ENDPOINT}/events/${projectId}/unavailable`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(date)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  updateUnavailableDates(projectId, dates) {
    //could just use this to update dates rather than postng for each
    return fetch(`${config.API_ENDPOINT}/events/${projectId}/update-unavailable`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(dates)
    })
  },
  getUnavailableDaysForMonth(month, year, projectId){
    //also need to implement in the changeYear function
    return fetch(`${config.API_ENDPOINT}/events/unavailable/${projectId}/${year}/${month}`, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json())
  },



}

export default EventService;