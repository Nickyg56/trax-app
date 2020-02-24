import React from 'react';
import ProjectsSidebar from './ProjectsSidebar/ProjectsSidebar';
import EventSidebar from './EventSidebar/EventSidebar';
import Chat from './Chat/Chat';
import config from '../../config';
import './Sidebar.css';
import UserContext from '../../Contexts/UserContext';
import EventService from '../../Services/EventServices';

class Sidebar extends React.Component {

  static contextType = UserContext;

  //use props to determine if the sidebar is open and the initial position
  constructor(props){
    super(props)
    this.state = {
      headerType: config.SIDEBAR_PROJECTS,
      currIndex: null,
      sidebarVisible: this.props.isOpen || false,
      x: 10,
      y: 70,
      events: [],
      projectFormOpen: false,
    }
    this.ref = React.createRef()
  }
  

  changeHeaderType = (type) => {
    this.setState({
      headerType: type,
    })
  }

  toggleSidebarVisible = () => {
    this.setState({ sidebarVisible: !this.state.sidebarVisible })
  }

  setActiveIndex = i => {
    this.setState({ currIndex: i })
  }

  toggleProjectForm = (bool) => {
    this.setState({
      projectFormOpen: !bool
    })
  }


  determineSidebarComponent = (type) => {
    if (type === config.SIDEBAR_PROJECTS) {
      return (
        <ProjectsSidebar 
          projects={this.props.projects} 
          setActiveIndex={this.setActiveIndex} 
          currIndex={this.state.currIndex} 
          toggleProjectForm={this.toggleProjectForm}
          />)
    } else if (type === config.SIDEBAR_CHAT) {
      return <Chat />
    } else if (type === config.SIDEBAR_EVENTS) {
      return <EventSidebar events={this.state.events} />
    }
  }


  componentDidMount(){
    this.pos1 = 0
    this.pos2 = 0
    this.pos3 = 0
    this.pos4 = 0

    const userId = this.context.user.id;

    if(userId){
      EventService.getEventsByUserId(userId)
        .then(res => {
          this.setState({
            events: res
          })
        })
    }
  }
  
  onMouseDown = e => {
    e.preventDefault()

    
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    document.onmouseup = this.closeDragElement
    document.onmousemove = this.elementDrag
  }

  elementDrag = e => {
    e.preventDefault();
   
    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    
    this.setState({
      y: (this.ref.current.offsetTop - this.pos2) + 'px',
      x: (this.ref.current.offsetLeft - this.pos1) + 'px',
    })
  }

  closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  }
  render() {
    const { headerType, sidebarVisible, projectFormOpen } = this.state;

    
    const selectedComponent = this.determineSidebarComponent(headerType)

    if (sidebarVisible) {
      return (
        <div className={'projects-sidebar-container ' + headerType}
          style={{ left: this.state.x, top: this.state.y }}
          ref={this.ref}
          onMouseDown={projectFormOpen ? null : (e => this.onMouseDown(e))}
        >
          <div className='chat-controller'>
            <button className='sidebar-collapse' onClick={this.toggleSidebarVisible}>^</button>
            <span
              className={(headerType === config.SIDEBAR_PROJECTS ? 'active ' : '') + 'sidebar-header'}
              onClick={headerType === config.SIDEBAR_PROJECTS ? () => null : () => this.changeHeaderType(config.SIDEBAR_PROJECTS)}>
              Projects
              </span>
            <span
              className={(headerType === config.SIDEBAR_CHAT ? 'active ' : '') + 'sidebar-header middle-header'}
              onClick={headerType === config.SIDEBAR_CHAT ? () => null : () => this.changeHeaderType(config.SIDEBAR_CHAT)}>
              Chat
              </span>
            <span
              className={(headerType === config.SIDEBAR_EVENTS ? 'active ' : '') + 'sidebar-header'}
              onClick={headerType === config.SIDEBAR_EVENTS ? () => null : () => this.changeHeaderType(config.SIDEBAR_EVENTS)}>
              Events
              </span>

          </div>
          {selectedComponent}
        </div>
      )
    } else return (
      <div className='sidebar-collapsed-container'>
        <button className='sidebar-collapsed-button' onClick={this.toggleSidebarVisible}>Show Sidebar</button>
      </div>
    )


  }

}

export default Sidebar;