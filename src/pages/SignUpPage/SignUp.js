import React from 'react';
import './../LoginPage/login.css';
import {connect} from 'react-redux';
import * as actions from './../../actions/index';

class SignUp extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			name:'',
			error: null
		}
	}

	onChange = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.value;
		this.setState({
			[name]:value,
		})
	}

	SignUpFrom = (event) => {
		event.preventDefault();
		var {email,password,name} = this.state;
		this.props.signUp(email,password,name);
	}

	componentWillReceiveProps(nextProps){
		var {history} = this.props;
		if (!nextProps.User.loggedIn) {
			this.setState({
				error: nextProps.User.error
			})
		}
		else{
			history.push({pathname:'/chat-room'});
			this.setState({
				error: null
			})
		}
	}

  	render() {
  		var {email,password,error,name} = this.state;

  		const isInvalid = email === '' || password === '';
    return (
      <div id="LoginForm" onSubmit={this.SignUpFrom}>
				<div className="container">
				<h1 className="form-heading text-center">ĐĂNG KÝ NGAY</h1>
				<div className="login-form">
				<div className="main-div">
				<div className="panel">
				<h2>Người dùng đăng ký</h2>
				<p>Please enter your email and password</p>
				</div>

				<form id="Login">

				<div className="form-group">
					<input 
						type="email" 
						className="form-control" 
						id="inputEmail" 
						placeholder="Email Address" 
						onChange={this.onChange}
						value={email}
						name='email'
						/>
				</div>
				<div className="form-group">
					<input 
						type="password" 
						className="form-control" 
						id="inputPassword" 
						placeholder="Password" 
						onChange={this.onChange}
						value={password}
						name='password'
						/>
				</div>
					<div className="form-group">
					<input 
						type="text" 
						className="form-control" 
						placeholder="Name" 
						onChange={this.onChange}
						value={name}
						name='name'
						/>
				</div>
					<button type="submit" className="btn btn-primary" disabled={isInvalid} type="submit">Đăng Ký</button>
				<br />
				{ error && <p className="signupError">{error.message}</p> }

				</form>
				</div>
				
				</div>
				</div>
			</div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		User:state.User
	}
}

const mapDispatchToProps = (dispatch,props) => {
	return{
		signUp: (email,password,name) =>{
			dispatch(actions.signUpRequest(email,password,name));
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)