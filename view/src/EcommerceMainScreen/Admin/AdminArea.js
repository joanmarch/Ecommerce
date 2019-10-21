import React, { Component } from 'react';
import './Admin.css';
import UploadProduct from './UploadProduct';
import Profile from './Profile';
import Messenger from './Messenger/index';



import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';







class AdminArea extends Component {
  constructor(props){
    super(props);
    this.state={
      uploadScreen :[],
    }
  }


  
  componentWillMount(){
    
   this.handleSelected(this.props.defaultSelected)
  }

  handleSelected(selected){
    var uploadScreen=[];
    if (selected==="profile"){
      uploadScreen.push(<Profile key={"profile"}/>);
      this.setState({
        uploadScreen:uploadScreen,
                      })
    }else if(selected==="uploadProduct"){
      uploadScreen.push(<UploadProduct appContext={this.props.parentContext} key={"upload-product"} />);
      this.setState({
        uploadScreen:uploadScreen,
                      })
    }else if (selected==="messages"){
      
      uploadScreen.push(<Messenger key="messenger"
      userChat={this.props.parentContext.state.userChat}
      handleChat={this.props.parentContext.handleChat}
      userLoggedin={this.props.parentContext.state.userLoggedin}
     
      />);
      this.setState({
        uploadScreen:uploadScreen,
                      })
    }
  }
  



  render() {

   

    return (
      <div>
        <div>
        <SideNav 
        onSelect={(selected) => {
          
          
          this.handleSelected(selected);
      }
      }
    >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected={this.props.defaultSelected}>
            <NavItem eventKey="profile">
                <NavIcon>
                    <i className="fa fa-user-circle-o" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Profile
                </NavText>
            </NavItem>
            <NavItem eventKey="uploadProduct">
                <NavIcon>
                    <i className="fa fa-list" aria-hidden="true" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Productos
                </NavText>
               
            </NavItem>
            <NavItem eventKey="messages">
                <NavIcon>
                    <i className="fa fa-commenting-o" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Messages
                </NavText>
            </NavItem>
            <NavItem eventKey="options">
                <NavIcon>
                    <i className="fa fa-cog" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Options
                </NavText>
                <NavItem eventKey="security">
                    <NavText>
                        Security
                    </NavText>
                </NavItem>
                <NavItem eventKey="settings">
                    <NavText>
                        Settings
                    </NavText>
                </NavItem>
            </NavItem>
        </SideNav.Nav>
    </SideNav>
        </div>
        <div className="AdminArea">
         <div className="container-admin upload-page">
          {this.state.uploadScreen}     
         </div>                      
        </div>      
      </div>
      
    );
  }
}
const style = {
  margin: 15,
};
export default AdminArea;
