import queryString from 'querystring'
import fullURL from './config'

export default {
  login(login, password) {
    const url = fullURL('v1/auth')
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: queryString.stringify({login, password})
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.json()
    }).then(({status, token}) => {
      if (!token) {
        throw new Error('Authorization failed!')
      } else {
        return token
      }
    })
  }
}
