import React from 'react';
import LoginForm from '../../Components/LoginForm/LoginForm';

class LoginRoute extends React.Component {

  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    },
  }
  

  onLoginSuccess = () => {
    console.log('On login success ran')
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/dashboard'
    history.push(destination)
  }

  render() {
    return (
      <section className='login-container'>
        <LoginForm onLoginSuccess={this.onLoginSuccess}/>
      </section>
    )
  }
}

export default LoginRoute;