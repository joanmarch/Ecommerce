import React, { Component } from 'react';
import ConversationList from './ConversationList';
import MessageList from './MessageList';
import axios from 'axios';
import './Messenger.css';
import { URL, URLchat } from '../../../config'
// import {socket} from '../../../App';
// import socketIOClient from "socket.io-client";
import socketIOClient from "socket.io-client";
export var socket =  socketIOClient('/', {
  secure: true,
  rejectUnauthorized: false,
  path: '/chat/socket.io'
});




export default class Messenger extends Component {
  constructor(props){
    super(props);
    this.state={
      currentConversationUser :"",
      conversations : [],
      messages: [],
    }
  }

  

  componentDidMount() {
   
    socket.on("OUTPUT_MESSAGE_toUSER", data =>{
      debugger
      this.getConversations(data.user)
      if (this.state.currentConversationUser===data.sender){
        this.getMessages(data.user)
      }else{
      }
    });

    socket.on('connect', async () => {
      
      console.log('Connected to socket:');
      socket.emit('SEND_NAME_TO_SERVER', this.props.userLoggedin)
    
    });

    socket.on('disconnect', async () => {
      console.log('Disconnected to socket:');
      if (!socket.connected){
        socket = socketIOClient("URLchat")
        // await socket.emit('SEND_NAME_TO_SERVER', props.userLoggedin) 
      }
    });

    this.getConversations();
  }

  getConversations = async (user) => {
        
      let url =  URL + "/conversations/get";
      
      let payload = {
        sender: this.props.userLoggedin,
        user
      }
      
    try{
        let response = await axios.post(url, payload);
        
      
        this.setState(prevState => {
              let conversations = response.data.map(result => {

                return {
                  photo: result.image,
                  name: payload.sender===result.user?result.sender:result.user,
                  text: result.message,
                  newData: result.newData 
                  
                };
              });
      
              return { ...prevState, conversations };
            });
    }catch(err){
      console.log(err);
    }
    }

  handleSelectConversation = (user) =>{
    this.getConversations(user)
    this.getMessages(user);
    this.setState({currentConversationUser:user})
      
  }

   static getDerivedStateFromProps(props, state) {   
    
   if (props.userChat === ""){
     return {}
   }else
  
    
    return { currentConversationUser: props.userChat };
  }


  changeFormatMessage=(arr)=>{
    let result = [];
    
    for (let i=0; i<arr.length; i++){
      
     let element={
        id: i,
        author: arr[i].sender,
        message : arr[i].message.text,
        timestamp: arr[i].updatedAt
      }
      result.push(element);
      
    }
      return result;
  }

  getMessages = async (user) => {
    
    let url = URL + "/messages/get";
    
    let payload = {
       user,
       sender: this.props.userLoggedin,
    }
    
    
  try{
      let response = await axios.post(url, payload);
           
      let messages = this.changeFormatMessage(response.data)
      
     
      this.setState(prevState => {
        return {
          ...prevState,
          messages
        };
      });
     
      
  }catch (error){
      console.log(error);
  }
}

  handleEnterKey = (data) => {
    
    socket.emit('INPUT_MESSAGE', data); 
    this.getMessages(data.user)
  }


  
  render() {
    // socket.on("OUTPUT_MESSAGE_toUSER", data =>{
    //   debugger
    //   this.getConversations(data.user)
      
    //   if (this.state.currentConversationUser===data.sender){
    //     this.getMessages(data.user)
    //   }else{

    //   }
      
    // })

    
    return (
      <div className="messenger">
        {/* <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        /> */}

        {/* <Toolbar
          title="Conversation Title"
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        /> */}

        <div className="scrollable sidebar">
          <ConversationList 
            
            updatedHour={this.state.updatedHour}
            conversations = {this.state.conversations}
            handleSelectConversation={this.handleSelectConversation} 
            currentConversationUser={this.state.currentConversationUser}
             />
        </div>

        <div className="scrollable content" >
          <MessageList 
          userLoggedin={this.props.userLoggedin}
          currentConversationUser={this.state.currentConversationUser}
          messages = {this.state.messages}
          handleEnterKey = {this.handleEnterKey}
         
          
          />
        </div>
      </div>
    );
  }
}