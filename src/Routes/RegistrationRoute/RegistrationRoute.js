import React from 'react';

import RegistrationForm from '../../Components/RegistrationForm/RegistrationForm';


class RegistrationRoute extends React.Component {
  static defaultProps = {
    history: {
      push: () => {}
    },
  }


  onRegistrationSuccess = () => {
    console.log('registration success ran')
    const { history } = this.props;
    history.push('/login')
  }

  render(){
    return (
      <section className='registration-container'>
      <RegistrationForm onRegistrationSuccess={this.onRegistrationSuccess}/>
      </section>
    )
  }

}

export default RegistrationRoute