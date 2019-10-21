import React, { Component } from 'react';
import ConversationList from './ConversationList';
import MessageList from './MessageList';
import './Messenger.css';
import { relativeTimeThreshold } from 'moment';



export default class Messenger extends Component {
  constructor(props){
    super(props);
    this.state={
      currentConversationUser :"",
    }
  }


  
  render() {
    
    
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
          <ConversationList userLoggedin={this.props.userLoggedin} handleChat={this.props.handleChat} userChat={this.props.userChat} />
        </div>

        <div className="scrollable content" >
          <MessageList userChat={this.props.userChat}
          userLoggedin={this.props.userLoggedin}
          currentConversationUser={this.state.currentConversationUser}
         
          
          />
        </div>
      </div>
    );
  }
}