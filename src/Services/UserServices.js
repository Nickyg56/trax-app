import config from '../config';
import TokenService from './TokenService';

const UserService = {
  postUser(user){
    return fetch(`${config.API_ENDPOINT}/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res
      )
  },
  postLogin({email, password}){
    console.log('post login ran')
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    }).then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
      )
  },
  getUserProjects(){
    return fetch(`${config.API_ENDPOINT}/projects`, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  },
  getUserJoinRequests(userId){
    return fetch(`${config.API_ENDPOINT}/projects/requests/user/${userId}`, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  }

}

export default UserService;