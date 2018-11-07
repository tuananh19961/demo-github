import React, { Component } from 'react';
import './chat.css';
import Chatbox from './Chatbox';
import InputMessage from './../components/InputMessage';
import {connect} from 'react-redux';

class ChatSection extends Component {

  constructor(){
    super();
    this.state = {
      user: ''
    };
  }

  componentDidMount(){
    var name = localStorage.getItem('name');
    if(name !== null){
      this.setState({
        user: name
      });
    }
  }


  render() {
    var {user} = this.state;
    return (  
      <div className="box-chat sticker">
       <section className="right">
            <div className="chat-head">
                <span>
                  <i className="fa fa-commenting-o"></i>
                  Trò chuyện chung
                </span>
            </div>

            <Chatbox user={user}/>

            <InputMessage user={user}/>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    User: state.User
  }
}

export default connect(mapStateToProps,null)(ChatSection);
