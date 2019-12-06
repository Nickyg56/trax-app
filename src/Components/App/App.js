import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import RegistrationRoute from '../../Routes/RegistrationRoute/RegistrationRoute';
import './App.css';
import LoginRoute from '../../Routes/LoginRoute/LoginRoute';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <main>
          <header className='App-header'>
            <h1 className='title'>Trax</h1>
          </header>
          <Switch>
            <Route
              exact path='/'
              component={LandingPage}
            />
            <Route
              path='/login'
              component={LoginRoute}
            />

            <Route
              path='/register'
              component={RegistrationRoute}
            />

          </Switch>
        </main>


      </div>
    );
  }

}

export default App;
