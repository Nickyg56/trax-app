import React from 'react';
import TokenService from '../Services/TokenService';


const UserContext = React.createContext({
  user: {},
  error: null,
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  processLogin: () => {},
  processLogout: () => {},
})

export default UserContext

export class UserProvider extends React.Component {
  constructor(props) {
    super(props)
    const state = {
      user: {},
      error: null,
    }

    const jwtPayload = TokenService.parseAuthToken()

    if(jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        full_name: jwtPayload.full_name,
        email: jwtPayload.email,
      }
      this.state = state;
  }

  setError = error => {
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setUser = user => {
    console.log('Set user ran')
    this.setState({ user })
  }

  processLogin = response => {
    console.log('Process login ran')

    const authToken = response.authToken;
    const user = response.user;
    TokenService.saveAuthToken(authToken)
    this.setUser({user})
  }

  processLogout = () => {
    TokenService.clearAuthToken()   
    this.setUser({})
  }

  render(){
    const value = {
      user: this.state.user,
      error: this.state.error,
      setUser: this.setUser,
      setError: this.setError,
      clearError: this.clearError,
      processLogin: this.processLogin,
      processLogout: this.processLogout
    }
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}