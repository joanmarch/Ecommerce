import React, { Component } from 'react';
import './App.css';

import Loginscreen from './UserLoginScreen/Loginscreen';
import UploadScreen from './EcommerceMainScreen/UploadScreen';
import AdminArea from './EcommerceMainScreen/Admin/AdminArea';

import { BrowserRouter as Router, Route } from "react-router-dom";

import NewPassword from './UserLoginScreen/NewPassword';
const userLoggedinContext = React.createContext("")
const userContext = React.createContext("");
// import socketIOClient from "socket.io-client";
// export const socket = socketIOClient("http://127.0.0.1:8000");



class App extends Component {
  constructor(){
    super();
    this.state={
      loginPage:[],
      uploadScreen:[],
      userLoggedin : "",
      pageTitle:"Wellcome to our market",
      response:"",
      userChat:"",
      
     
    }
  }
  
/*   componentWillMount(){
    var loginPage =[];
    loginPage.push(<Loginscreen parentContext={this} key={"login-screen"}/>);
    this.setState({
                  loginPage:loginPage
                    })
  } */

  onClickAdmin=(defaultSelected)=>{
    var uploadScreen=[];
    uploadScreen.push(<AdminArea parentContext={this} defaultSelected={defaultSelected} key={"admin-screen"}/>);
    this.setState({
      uploadScreen:uploadScreen,
                  pageTitle:"Admin Area",  
                    })
  }

  onClickMarket=()=>{
    
    var uploadScreen=[];
    uploadScreen.push(<UploadScreen userLoggedin={this.state.userLoggedin} handleChat={this.handleChat} key={"upload-screen"} />);
    this.setState({
      uploadScreen:uploadScreen,
                  pageTitle:"Wellcome to our market"
                    })
  }

  onClickLogin=()=>{
   
    
    var uploadScreen=[];
    uploadScreen.push(<Loginscreen parentContext={this} showMarket={this.onClickMarket} key={"login-screen"}/>);
    this.setState({
      uploadScreen:uploadScreen,
                  pageTitle:"LogIn"
                    })
  }
  

  componentWillMount(){
   if(!this.isComponentMounted){
    var uploadScreen =[];
    uploadScreen.push(<UploadScreen  handleChat={this.handleChat} key={"upload-screen"}/>);
    this.setState({
      uploadScreen:uploadScreen
                    })
    }
  }





  handleChat =  (user) =>{
    this.setState({userChat:user})
    this.onClickAdmin("messages");
   }

  render() {
  
  
   
    return ( 
      <userContext.Provider value={this.state.userChat} >
      <Router>    
      <div className="App">
        <div className="firstdiv">
             <div className="secdiv"> 
                 <button className="btn mybuttonicon"><i className="fa fa-bars"></i></button>
                 <h1 className = "abcd">{this.state.pageTitle}</h1>
                 {this.state.userLoggedin===""? null : <button className="btn mybuttontext" onClick={()=>this.onClickAdmin("profile")}><span className="btn">Admin</span></button>  }
                 {this.state.userLoggedin===""? <button className="btn mybuttontext" onClick={this.onClickLogin}><span className="btn">LogIn</span></button> : <span className="btn">Wellcome {this.state.userLoggedin}</span>}
                 <button className="btn mybuttontext" onClick={this.onClickMarket}><span className="btn">Market</span></button>
              </div>                
        </div>      
        <userLoggedinContext.Provider value = {this.state.userLoggedin}>
        {this.state.uploadScreen}
        </userLoggedinContext.Provider>
      </div>
      <Route path="/user/ResetPassword/:tokenId" component = {NewPassword}></Route>
      </Router>
      </userContext.Provider>
    );
  }
}
const style = {
  margin: 15,
};
export default App;
