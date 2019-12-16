import React from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../Services/UserServices';
import UserContext from '../../Contexts/UserContext';
import './LoginForm.css';


class LoginForm extends React.Component {
  static defaultProps = {
    onLoginSuccess: () => { },
  }

  static contextType = UserContext;

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

    UserService.postLogin({
      email: email.value,
      password: password.value,
    })
      .then(res => {
        console.log(this.context)
        email.value = ''
        password.value = ''
        this.context.processLogin(res)
        this.props.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })

  }


  render() {
    const { error } = this.state;
    return (
      <form
        className='login-form'
        onSubmit={this.handleSubmit}
      >
        <div role='alert' className='alert'>
          {error && <p>{error}</p>}
        </div>
        <div className='login-form-row'>
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
        </div>
        <div className='login-form-row'>
          <label htmlFor='login-password-input'>
            Password:
              </label>
          <input
            id='login-password-input'
            name='password'
            type='password'
            required
          />
        </div>

        <button type='submit'
          className='login-button'
        >
          Login
            </button>
        <div className='signup-link-container'>
          <span>Don't have an account? <Link to='/register' className='sign-up-link' >Sign up!</Link></span>
        </div>
      </form>
    )
  }
}

export default LoginForm;