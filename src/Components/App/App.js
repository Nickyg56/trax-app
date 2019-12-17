import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import RegistrationRoute from '../../Routes/RegistrationRoute/RegistrationRoute';
import './App.css';
import LoginRoute from '../../Routes/LoginRoute/LoginRoute';
import DashboardRoute from '../../Routes/DashboardRoute/DashboardRoute';
import ProjectsRoute from '../../Routes/ProjectsRoute/ProjectsRoute';
import Calendar from '../Calendar/Calendar';

class App extends React.Component {



  render() {
    return (
      <div className="App">
        <main>
          <header className='App-header'>
            <h1 className='title'><Link to='/dashboard' className='title-link' >Trax</Link></h1>
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

            <Route
              exact
              path='/dashboard'
              component={DashboardRoute}
            />

            <Route
              exact
              path='/projects/:projectId'
              component={ProjectsRoute}
            />

            <Route
              exacts
              path='/calendar/project/:projectId'
              render={(props) => {
                return (
                  <Calendar {...props} calendarType={'project'}/>
                )
              }}
            />

          </Switch>
        </main>


      </div>
    );
  }

}

export default App;
