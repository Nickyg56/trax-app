import React from 'react';
import {Link} from 'react-router-dom'; 
import TokenService from '../../Services/TokenService';
import UserContext from '../../Contexts/UserContext';
import './Header.css';

class Header extends React.Component {

  static contextType = UserContext;
  
  constructor(){
    super()
    this.state = {
      loggedIn: false,
    }
  }

  componentDidMount(){
    if(TokenService.hasAuthToken()){
      this.setState({ loggedIn: true });
    }
  }

  handleLogout = () => {

    TokenService.clearAuthToken()
    this.context.setUser({})
    this.context.setUserProjects([])
    this.setState({ loggedIn: false })
  }

  render(){
    const {loggedIn} = this.state;


    return (
      <header className='App-header'>
            <h2>Home</h2>
            <h1 className='title'><Link to='/dashboard' className='title-link' >Trax</Link></h1>
            {loggedIn 
              ? <button className='header-button' onClick={this.handleLogout}>Sign Out</button>
              : <button className='header-button'><Link to='/login' className='signin-link' >Sign In</Link></button>}
      </header>
    )
  }
}

export default Header;