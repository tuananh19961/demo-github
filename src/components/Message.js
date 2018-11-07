import React from 'react';
class Message extends React.Component {
  render() {
  	var {text,user} = this.props;
  	var className = text.user === user ? 'me' : 'you';
    return (
      <div>
      		<div className = {`chat-bubble ${className}`}>
                    <div className="my-mouth"></div>
                    <h4 className="user-chat">{text.user}</h4>
                    <div className="content">{text.text}</div>
                    <div className="time">{text.time}</div>
            </div>
      </div>
    );
  }
}

export default Message