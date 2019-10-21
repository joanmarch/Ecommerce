import React, { Component } from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';
import axios from 'axios';
import {socket} from '../../../../App'

import './MessageList.css';



export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentConversationUser:""
    };
  }

  componentDidMount() {
    
    this.getMessages(this.props.userChat);
    this.state.currentConversationUser=this.props.userChat;
  }

  changeFormat=(arr)=>{
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
    
    let url =
    "http://localhost:3001/messages/get";
    
    let payload = {
      user,
      sender: this.props.userLoggedin,
    }

    
  try{
      let response = await axios.post(url, payload);
      debugger
      
      let messages = this.changeFormat(response.data)
      
     
      this.setState(prevState => {
        return {
          ...prevState,
          messages
          // messages: [
          //   // {
          //   //   id: 1,
          //   //   author: 'apple',
          //   //   message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          //   //   timestamp: new Date().getTime()
          //   // },
          //   // {
          //   //   id: 2,
          //   //   author: 'orange',
          //   //   message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          //   //   timestamp: new Date().getTime()
          //   // },
          //   // {
          //   //   id: 3,
          //   //   author: 'orange',
          //   //   message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          //   //   timestamp: new Date().getTime()
          //   // },
          //   // {
          //   //   id: 4,
          //   //   author: 'apple',
          //   //   message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          //   //   timestamp: new Date().getTime()
          //   // },
          //   // {
          //   //   id: 5,
          //   //   author: 'apple',
          //   //   message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          //   //   timestamp: new Date().getTime()
          //   // },
          //   // {
          //   //   id: 6,
          //   //   author: 'apple',
          //   //   message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          //   //   timestamp: new Date().getTime()
          //   // },
          //   // {
          //   //   id: 7,
          //   //   author: 'orange',
          //   //   message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          //   //   timestamp: new Date().getTime()
          //   // },
          //   // {
          //   //   id: 8,
          //   //   author: 'orange',
          //   //   message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          //   //   timestamp: new Date().getTime()
          //   // },
          //   // {
          //   //   id: 9,
          //   //   author: 'apple',
          //   //   message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          //   //   timestamp: new Date().getTime()
          //   // },
          //   // {
          //   //   id: 10,
          //   //   author: 'orange',
          //   //   message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          //   //   timestamp: new Date().getTime()
          //   // },
          // ]
        };
      });
     
      
  }catch (error){
      console.log(error);
  }
}
    
 
  

  renderMessages() {
    let i = 0;
    let messageCount = this.state.messages.length;
    let messages = [];
    const MY_USER_ID = this.props.userLoggedin;

    while (i < messageCount) {
      let previous = this.state.messages[i - 1];
      let current = this.state.messages[i];
      let next = this.state.messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      messages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return messages;
  }

  render() {
    socket.on("OUTPUT_MESSAGE_toUSER", data =>{
      this.getMessages()
    })
    socket.on("UPDATE_CONVERSATION", user =>{
      this.getMessages(user)
      this.setState({currentConversationUser:user})
      
    })
   
    
    return(
      <div className="message-list">
        <Toolbar
          title="Conversation Title"
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        />

        <div className="message-list-container">{this.renderMessages()}</div>

        <Compose userChat={this.state.currentConversationUser} getMessages={this.getMessages} userLoggedin={this.props.userLoggedin} rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="money" icon="ion-ios-card" />,
          <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />
        ]}/>
      </div>
    );
  }
}