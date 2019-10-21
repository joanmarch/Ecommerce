import React, { Component } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Products from '../Components/Products';

class Slidebar extends Component {
    constructor(props){
      super(props);
      this.state={
      name:"",
      price:0,
      id:""
      }
    }
   
    
    render() {
      return (
        <SideNav className="slidebar-left"
        onSelect={(selected) => {
            // Add your code here
           if (selected="profile"){

           }else if(selected="load"){

           }else if (selected="messages"){

           }else if (selected="options"){

           }
        }}
    >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="profile">
            <NavItem eventKey="profile">
                <NavIcon>
                    <i className="fa fa-user-circle-o" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Profile
                </NavText>
            </NavItem>
            <NavItem eventKey="products">
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
      );
    }
  }
 
  export default Slidebar;
  