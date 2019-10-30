import React, { Component } from 'react';
import '../App.css';
import Axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { URL } from '../config'

class PasswordRecovery extends Component {
constructor(props){
  super(props);
  this.state={
  email:'',

  
  }
 }

 async handleClick(event) {
     var payload={
       "email":this.state.email,
       }
      try{
        let response = await Axios.post (URL + '/user/ForgotPassword', payload)
        
        if(response.data.code == 200){
            alert("Recovery email sent, please check your mail box");
         }else if (response.data.code == 205){
             alert("Email not existing");
           }
           else{
           console.log("Username does not exists");
           alert("Username does not exist");
           }
      }
      catch(error){
        console.log(error);
      }
       
 }
 
render() {
    
    return (
     
     <div className="Access-display">
         <div className="Access_veil">
      <div className="Access">
        <svg className="Access_login-cross" onClick={this.props.ClosePasswordRecovery} xmlns="http://www.w3.org/2000/svg" width="48" height="48" name="cross_icon" size="48" viewBox="0 0 48 48"><path d="M22.586 24l-7.293-7.293a1 1 0 0 1 1.414-1.414L24 22.586l7.293-7.293a1 1 0 0 1 1.414 1.414L25.414 24l7.293 7.293a1 1 0 0 1-1.414 1.414L24 25.414l-7.293 7.293a1 1 0 0 1-1.414-1.414L22.586 24z"></path></svg>
        <h3>¿Has olvidado la contraseña?</h3>
        <h4 className="ForgotPassword_info">No te preocupes, a todos nos pasa. Escribe tu dirección de email</h4>
        <MuiThemeProvider>
        <TextField
             hintText="Enter your Email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
         <RaisedButton label="Recover your password" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </MuiThemeProvider>
      </div>
      </div>
      </div>
     
    );
  }
}

const style = {
    margin: 15,
   };

export default PasswordRecovery;

