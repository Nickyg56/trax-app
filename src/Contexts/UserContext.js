import React from 'react';
import TokenService from '../Services/TokenService';


const UserContext = React.createContext({
  user: {},
  userProjects: [],
  error: null,
  projectIndex: null,
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  setUserProjects: () => {},
  setProjectIndex: () => {},
  processLogin: () => {},
  processLogout: () => {},
})

export default UserContext

export class UserProvider extends React.Component {
  constructor(props) {
    super(props)
    const state = {
      user: {},
      userProjects: [],
      error: null,
      projectIndex: null,
    }

    const jwtPayload = TokenService.parseAuthToken()

    if(TokenService.hasAuthToken())
      state.user = {
        id: jwtPayload.user_id,
        fullName: jwtPayload.full_name,
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
    console.log('CONTEXT Set user ran', user)
    
    this.setState({ user })
  }

  setUserProjects = projects => {
    this.setState({ userProjects: projects })
  }

  setProjectIndex = i => {
    console.log(`project index set to ${i}`)
    this.setState({projectIndex: i})
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
      userProjects: this.state.userProjects,
      error: this.state.error,
      projectIndex: this.state.projectIndex,
      setUser: this.setUser,
      setUserProjects: this.setUserProjects,
      setProjectIndex: this.setProjectIndex,
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