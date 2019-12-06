import React from 'react';
import LoginForm from '../../Components/LoginForm/LoginForm';

class LoginRoute extends React.Component {
  

  render() {
    return (
      <section className='login-container'>
        <LoginForm />
      </section>
    )
  }
}

export default LoginRoute;