import config from '../config';


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
}

export default VisitorService;