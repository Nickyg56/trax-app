import React from 'react';
import { Link } from 'react-router-dom';


class LoginForm extends React.Component {
  static defaultProps ={
    onLoginSuccess: () => {},
  }

  state = {
    error: null,
  }

  firstInput = React.createRef()

  componentDidMount() {
    this.firstInput.current.focus()
  }

  handleSubmit = ev => {
    ev.preventDefault();
    const { email, password } = ev.target;

    console.log(email.value, password.value)
  }


  render(){
    const { error } = this.state; 
    return (
      <form
            className='form'
            onSubmit={this.handleSubmit}
          >
            <div role='alert' className='alert'>
              {error && <p>{error}</p>}
            </div>
            <h2>Login</h2>
              <label htmlFor='login-email-input'>
                Email:
              </label>
              <input
                ref={this.firstInput}
                id='login-email-input'
                name='email'
                type='email'
                required
              />
              <label htmlFor='login-password-input'>
                Password:
              </label>
              <input
                id='login-password-input'
                name='password'
                type='password'
                required
              />
            <button type='submit'
              className='button purple-button'
            >
              Login
            </button>
            <div className='login-link'>
              <Link to='/register' >Don't have an account? Sign up!</Link>
            </div>
          </form>
    )
  }
}

export default LoginForm;