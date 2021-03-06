import React, { Component } from 'react';
import './Compose.css'; 
import {socket} from '../../../../App'

export default class Compose extends Component {
  constructor(props){
    super(props);
    this.state={
      message :"", 
    
    }
  }

  static getDerivedStateFromProps(props, state) {
    // console.log(state);
    return { currentConversationUser: props.currentConversationUser };
  }

  handelKeyPress = (event) =>{
   
    if(event.key ==="Enter"){
      var data = {
        message : this.state.message,
        user : this.props.currentConversationUser,
        sender : this.props.userLoggedin,
        
      }
      this.props.handleEnterKey (data)
      
      // emit an event to all connected sockets
      // setTimeout(this.props.getMessages,700);
     
      this.setState({message:""})
    }
    
  }

  handleChange = event =>{
    this.setState({[event.target.name] : event.target.value})
   
  }

  render() {
    
    
    return (
      <div className="compose">
        <input
          disabled={this.props.currentConversationUser===""?true:false}
          type="text"
          className="compose-input"
          placeholder="Select a conversation to enable chat..."
          onKeyPress={this.handelKeyPress}
          onChange={this.handleChange} 
          name="message"
          value={this.state.message}
        />

        {
          this.props.rightItems
        }
      </div>
    );
  }
}