import React from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

 class InputMessage extends React.Component {

 	constructor(props){
 		super(props);
 		this.state = {
 			value: ''
 		}
 	}

 	onChange = (e) => {
 		this.setState({
 			value: e.target.value
 		});	
 	}

 	onSubmitForm = (e) => {
 		e.preventDefault();
        const date = new Date();
        const now = `${date.getHours()}:${date.getMinutes()}`;
 		var {value} = this.state;
        var {user} = this.props;
        var item = {
              id: Date.now(),
              user: user,
              text: value,
              time: now
        }
 		this.props.InputMessage(item);
 		this.setState({value: ''});
 	}

	render() {
		var {value} = this.state;
		return (
			 <div className="wrap-message">
                <i className="fa fa-smile-o fa-lg" aria-hidden="true"></i>
                <div className="message">
                    <form onSubmit = {this.onSubmitForm} className="form-chat">
                        <input type="text" className="input-message" placeholder="Viết gì đó" name="newdata" value={value} onChange={this.onChange} required="required"/>
                    </form>
                </div>
                <i className="fa fa-microphone fa-lg" aria-hidden="true"></i>
            </div>
		);
	}
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch,props) => {
    return {
        InputMessage: (item) => {
            dispatch(actions.inputMessageRequest(item))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(InputMessage)