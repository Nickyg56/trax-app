import React from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../Services/UserServices';


class RegistrationForm extends React.Component {

  static defaultProps = { 
    onRegistrationSuccess: () => { } 
  }

  state = { error: null }

  firstInput = React.createRef();

  componentDidMount() {
    this.firstInput.current.focus();
  }

  handleSubmit = ev => {
    ev.preventDefault();

    const { full_name, password, email } = ev.target;

    console.log(full_name.value, password.value, email.value)

    UserService.postUser({
      full_name: full_name.value,
      password: password.value,
      email: email.value,
    })
      .then(user => {
        full_name.value = ''
        email.value = ''
        password.value = ''
        this.props.onRegistrationSuccess();
      })
      .catch(res => {
        this.setState({
          error: res.error
        })
      })


  }

  render(){
    const { error } = this.state;

    return (
      <form
        className='form'
        onSubmit={this.handleSubmit}>
        <div className='alert' role='alert'>
        {error && <p>{error}</p>}
        </div>
          <h2>Sign up</h2>
          <label htmlFor='registration-full-name-input'>
          Full Name:
          </label>
          <input
            ref={this.firstInput}
            id='registration-full-name-input'
            name='full_name'
            placeholder='John Doe'
            aria-label='Registration full name input'
            aria-required='true'
            required />
          <label htmlFor='registration-email-input'>
            E-mail: 
          </label>
          <input
            id='registration-email-input'
            name='email'
            placeholder='john@email.com'
            aria-label='Registration email input'
            aria-required='true'
            required />
          <label
            htmlFor='registration-password-input'>
            Password: 
          </label>
          <input 
            id='registration-password-input'
            name='password'
            type='password'
            aria-label='Registration password input'
            aria-required='true'
            required/>
          <button type='submit' className='button purple-button'>
            Sign Up!
          </button>
          
          <div className='link-to-login'>
            <Link to='/login' className='login-link'>Already have an account?</Link>
          </div>
      </form>
    )
  }
}

export default RegistrationForm;