import React, { Component } from 'react';
import '../App.css';
import Axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { NavLink } from "react-router-dom";
const bcrypt = require('bcryptjs');
import { URL } from '../../../config'


class NewPassword extends Component {
constructor(props){
  super(props);
  this.state={
  password:'',
  errors : {}

  }
 }

 validatePassword(){

    let fields = { 
        password : this.state.password 
    };

    let errors = {};
    let formIsValid = true;

    if (!fields["password"] || fields["password"]=="") {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
      }
  
      if ((typeof fields["password"] !== "undefined") && (fields["password"] !=="")) {
        if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)) {
          formIsValid = false;
          errors["password"] = "*Please enter secure and strong password. The password must be at least of 8 characters, including one lowercase letter, one uppercase letter and one number.";
        }
      }
      this.setState({
        errors: errors
      });
      return formIsValid;
 }

 async handleClick(e) {
    let tokenId = this.props.match.params.tokenId;
  e.preventDefault();
    if (this.validatePassword()) {
    let encryptpass = this.state.password;
     await bcrypt.genSalt(10, async function(err, salt){
        await bcrypt.hash(encryptpass, salt, async (err, hash) => {
            if(!err){ 
              try{
                var payload={
                  "password":hash,
                  "tokenId" : tokenId
                  }
                let response = await Axios.post( URL + '/user/resetPassword', payload)
                if(response.status == 200){
                  alert(response.data.msg);
                  let fields = {};
                  fields["password"] = "";                
                  this.setState({fields:fields});
                  console.log("Constraseña restablecida correctamente");
                }
            }
            catch(error){
              console.log(error)
            }
      }else{
        console.log(err);
      }
    }
      )
})
  }

  }
       
 
 
render() {
    
    return (
     
     <div className="Access-display">
         <div className="Access_veil">
      <div className="Access">
        <NavLink exact to="/">  <svg className="Access_login-cross" xmlns="http://www.w3.org/2000/svg" width="48" height="48" name="cross_icon" size="48" viewBox="0 0 48 48"><path d="M22.586 24l-7.293-7.293a1 1 0 0 1 1.414-1.414L24 22.586l7.293-7.293a1 1 0 0 1 1.414 1.414L25.414 24l7.293 7.293a1 1 0 0 1-1.414 1.414L24 25.414l-7.293 7.293a1 1 0 0 1-1.414-1.414L22.586 24z"></path></svg>
        </NavLink>      
        <h3>Restablecer contraseña</h3>
        <h4 className="ForgotPassword_info">Escribe la nueva contraseña que quieres usar</h4>
        <MuiThemeProvider>
        <TextField
              type = "password"
              hintText="Enter your Password"
              floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
             <div className="errorMsg">{this.state.errors.password}</div>
           <br/>
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

export default NewPassword;