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
      // conversations: [],
      
    };
  }

  // componentDidMount() {
  //   this.getConversations();
  // }

  // changeFormat=(arr)=>{
  //   let result = [];
    
  //   for (let i=0; i<arr.length; i++){
      
  //    let element={
  //       photo: arr[i].image,
  //       name : arr[i].sender,
  //       text: arr[i].text
  //     }
  //     result.push(element);
      
  //   }
    
  //   return result;
  // }

 

  // getConversations = async () => {
        
  //   let url =
  //   "http://localhost:3001/conversations/get";
    
  //   let payload = {
  //     sender: this.props.userLoggedin,
  //   }
    
  // try{
  //     let response = await axios.post(url, payload);
  //     debugger
      
  //     this.setState(prevState => {
  //           let conversations = response.data.map(result => {
  //             return {
  //               photo: result.image,
  //               name: payload.sender===result.user?result.sender:result.user,
  //               text: result.message
  //             };
  //           });
    
  //           return { ...prevState, conversations };
  //         });
  // }catch(err){
  //   console.log(err);
  // }
  // }

  render() {
   
    
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
          this.props.conversations.map(conversation =>
            <ConversationListItem
              currentConversationUser={this.props.currentConversationUser}
              handleSelectConversation={this.props.handleSelectConversation}
              updatedHour = {this.props.updatedHour}
              key={conversation.name}
              data={conversation}
            />
          )
        }
      </div>
    );
  }
}