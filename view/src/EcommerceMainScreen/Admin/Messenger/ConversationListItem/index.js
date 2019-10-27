import React, { Component } from 'react';
import shave from 'shave';
import {socket} from '../../../../App';

import './ConversationListItem.css';

export default class ConversationListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentConversationUser:""
    };
  }

  componentDidMount() {
    shave('.conversation-snippet', 20);
  }

  render() {
    const { photo, name, text, newData } = this.props.data;
    
    
    return (
      <div onClick={()=>this.props.handleSelectConversation(name)} className={this.props.currentConversationUser===name? "conversation-list-item-sel":"conversation-list-item"}>
        <img className="conversation-photo" src={photo} alt="conversation" />
        <div className="conversation-info">
          <h1 className="conversation-title">{ name }</h1>
          <p className="conversation-snippet">{ text }</p>
        </div>
        {newData?<div className="conversation-new"></div>: null }
      </div>
    );
  }
}

const styles ={
  selected:{
    backgroundcolor: "coral"
      
    }
  }