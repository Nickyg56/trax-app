import React from 'react';
// import ProjectsSideBar from '../../Components/ProjectsSidebar/ProjectsSidebar';
import UserContext from '../../Contexts/UserContext';
import UserService from '../../Services/UserServices';
import Sidebar from '../../Components/Sidebar/Sidebar';

//TO DO:
// calender, side menu, 

class DashBoardRoute extends React.Component {

  static contextType = UserContext;

  constructor(props){
    super(props)
    this.state = {
      error: null,
      loaded: false,
      projects: null,
    }
  }
  

  componentDidMount(){
    this.context.setProjectIndex(null)
    UserService.getUserProjects()
    .then(res => {
      this.context.setUserProjects(res);
      this.setState({ 
        loaded: true,
        projects: res,
      })
    })
  }

  

  render() {
    
    const { loaded, projects } = this.state;

    if(!loaded){
      return <p>Loading</p>
    }
    return (
      <div className='dashboard-container'>
        <h1>DashboardRoute</h1>
       <Sidebar projects={projects} />
      </div>
    )
  }
}

export default DashBoardRoute;