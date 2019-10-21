import React, { Component } from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';
import {socket} from '../../../../App';

import './ConversationList.css';
import { relativeTimeThreshold } from 'moment';

export default class ConversationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      currentConversationUser:""
    };
  }

  componentDidMount() {
    this.getConversations();
  }

  changeFormat=(arr)=>{
    let result = [];
    
    for (let i=0; i<arr.length; i++){
      
     let element={
        photo: arr[i].image,
        name : arr[i].sender,
        text: arr[i].text
      }
      result.push(element);
      
    }
    
    return result;
  }

  handleSelectConversation = (user) =>{
  
    this.setState({currentConversationUser:user})
   
    
   }

  getConversations = async () => {
        
    let url =
    "http://localhost:3001/conversations/get";
    
    let payload = {
      sender: this.props.userLoggedin,
    }
    
  try{
      let response = await axios.post(url, payload);
      debugger
      // let conversations = this.changeFormat(response.data)
      
      
      this.setState(prevState => {
            let conversations = response.data.map(result => {
              return {
                photo: result.image,
                name: payload.sender===result.user?result.sender:result.user,
                text: result.message
              };
            });
    
            return { ...prevState, conversations };
          });
  }catch(err){
    console.log(err);
  }
    // axios.get('https://randomuser.me/api/?results=20').then(response => {
    //   this.setState(prevState => {
    //     let conversations = response.data.results.map(result => {
    //       return {
    //         photo: result.picture.large,
    //         name: `${result.name.first} ${result.name.last}`,
    //         text: 'Hello world! This is a long message that needs to be truncated.'
    //       };
    //     });

    //     return { ...prevState, conversations };
    //   });
    // });

  }

  render() {
    socket.on("OUTPUT_MESSAGE_toUSER", data =>{
      this.getConversations()
    })
    
    return (
      <div className="conversation-list">
        <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        />
        <ConversationSearch />
        {
          this.state.conversations.map(conversation =>
            <ConversationListItem
            currentConversationUser={this.state.currentConversationUser}
              handleSelectConversation={this.handleSelectConversation}
              handleChat={this.props.handleChat}
              key={conversation.name}
              data={conversation}
            />
          )
        }
      </div>
    );
  }
}