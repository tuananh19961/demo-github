import React from 'react';
import Message from './../components/Message';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class Chatbox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: {}
    }
  }

  componentDidMount(){
    this.props.getListMessages();
    this.updateScroll();
  }

  componentDidUpdate(){
    this.updateScroll();
  }

  componentWillReceiveProps(nextProps){
     this.setState({
      messages: nextProps.Messages
    });

  }

  updateScroll = () =>{
     var element = document.getElementById("list");
     element.scrollTop = element.scrollHeight;
  }



  render() {
    var {user} = this.props;    
    const { messages } = this.state;
    const ids = Object.keys(messages);
    var list = [];
    if(ids.length > 0){
      list = ids.map((id) =>{ 
        return(
            <Message status={true} key={id} text = {messages[id]} user={user}/>
        );
      })
    }


    return (
       <div className="wrap-chat">

                <div className="chat" id="list">
                        {list}
                </div>

       </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Messages : state.Messages
  }
}

const mapDipatchToProps = (dispatch,props) => {
  return{
    getListMessages: () => {
      dispatch(actions.getListMessageRequest());
    }
  }
}
export default connect(mapStateToProps,mapDipatchToProps)(Chatbox)