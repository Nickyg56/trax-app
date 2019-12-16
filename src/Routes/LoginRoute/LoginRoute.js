import React from 'react';
import LoginForm from '../../Components/LoginForm/LoginForm';
import './LoginRoute.css';


class LoginRoute extends React.Component {


  static defaultProps = {
    location: {},
    history: {
      push: () => { }
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
      <div className='login-container'>
        <section className='login-section'>
          <LoginForm onLoginSuccess={this.onLoginSuccess} />
        </section>
      </div>
    )
  }
}

export default LoginRoute;