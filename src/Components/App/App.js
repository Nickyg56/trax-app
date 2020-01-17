import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import RegistrationRoute from '../../Routes/RegistrationRoute/RegistrationRoute';
import './App.css';
import LoginRoute from '../../Routes/LoginRoute/LoginRoute';
import DashboardRoute from '../../Routes/DashboardRoute/DashboardRoute';
import ProjectsRoute from '../../Routes/ProjectsRoute/ProjectsRoute';
import ProjectVisitorRoute from '../../Routes/ProjectVisitorRoute/ProjectVisitorRoute';
// import Calendar from '../Calendar/Calendar';
import Header from '../Header/Header';

class App extends React.Component {


  state = {
    user: null,
  }


  setUser = user => {
    this.setState({ user })
  }


  render() {

    const {user} = this.state

    return (
      <div className="App">
        <main>
          <Header />
          <Switch>
            <Route
              exact path='/'
              component={LandingPage}
            />
            <Route
              path='/login'
              render={(props) => <LoginRoute {...props} setUser={this.setUser}/>}
            />

            <Route
              path='/register'
              component={RegistrationRoute}
            />

            <Route
              exact
              path='/dashboard'
              render={(props) => <DashboardRoute {...props} user={user} />}
            />

            <Route
              exact
              path='/projects/:projectId'
              component={ProjectsRoute}
            />

            <Route
              exact 
              path='/projects/visitor/:projectId'
              component={ProjectVisitorRoute}
              />

            {/* <Route
              exacts
              path='/calendar/project/:projectId'
              render={(props) => {
                return (
                  <Calendar {...props} calendarType={'project'}/>
                )
              }}
            /> */}

          </Switch>
        </main>


      </div>
    );
  }

}

export default App;
