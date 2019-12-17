import React from 'react';
import ProjectsSidebar from '../ProjectsSidebar/ProjectsSidebar';
import EventSidebar from '../EventSidebar/EventSidebar';
import Chat from '../Chat/Chat';
import config from '../../config';
import './Sidebar.css';
import UserContext from '../../Contexts/UserContext';

class Sidebar extends React.Component {

  static contextType = UserContext;

  state = {
    headerType: config.SIDEBAR_PROJECTS,
    currIndex: null,
    sidebarVisible: true,
  }

  changeHeaderType = (type) => {
    this.setState({
      headerType: type,
    })
  }

  toggleSidebarVisible = () => {
    this.setState({ sidebarVisible: !this.state.sidebarVisible})
  }

  setActiveIndex = i => {
    this.setState({ currIndex: i })
  }


  determineSidebarComponent = (type) => {
    if (type === config.SIDEBAR_PROJECTS) {
      return <ProjectsSidebar projects={this.props.projects} setActiveIndex={this.setActiveIndex} currIndex={this.state.currIndex}/>
    } else if (type === config.SIDEBAR_CHAT) {
      return <Chat />
    } else if (type === config.SIDEBAR_EVENTS) {
      return <EventSidebar />
    }
  }

  render() {
    const { headerType, sidebarVisible } = this.state;
    console.log(sidebarVisible)

    const selectedComponent = this.determineSidebarComponent(headerType)

    if(sidebarVisible){
      return (
        <div className={'projects-sidebar-container ' + headerType}>
          <div className='chat-controller'>
          <button onClick={this.toggleSidebarVisible}>^</button>
            <span
              className={(headerType === config.SIDEBAR_PROJECTS ? 'active ' : '') + 'sidebar-header'}
              onClick={() => this.changeHeaderType(config.SIDEBAR_PROJECTS)}>
              Projects
              </span>
            <span
              className={(headerType === config.SIDEBAR_CHAT ? 'active ' : '') + 'sidebar-header middle-header'}
              onClick={() => this.changeHeaderType(config.SIDEBAR_CHAT)}>
              Chat
              </span>
            <span
              className={(headerType === config.SIDEBAR_EVENTS ? 'active ' : '') + 'sidebar-header'}
              onClick={() => this.changeHeaderType(config.SIDEBAR_EVENTS)}>
              Events
              </span>
  
          </div>
          {selectedComponent}
        </div>
      )
    } else return (
      <div className='projects-sidebar-collapsed'>
        <button onClick={this.toggleSidebarVisible}>Show Sidebar</button>
      </div>
    )

    
  }

}

export default Sidebar;