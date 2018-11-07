import React from 'react';
import './login.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actions from './../../actions/index';
import firebase from './../../firebase';
import Notifications, {notify} from 'react-notify-toast';

class LoginPages extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
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


	SignInFrom = (event) => {
		event.preventDefault();
		var {email,password} = this.state;
		this.props.signIn(email,password);
	}


	componentWillReceiveProps(nextProps){
		var {history} = this.props;
		if(nextProps.User.loggedIn){
			history.push('/chat-room')
		}
		this.setState({
				error: nextProps.User.err,
		});
		
	}

	resetPassWord = () => {
		var {email} = this.state;
		var auth = firebase.auth();
		var emailAddress = email;
		auth.sendPasswordResetEmail(emailAddress).then(function(url) {
			notify.show("Đã gửi, Kiểm tra email để lấy lại mật khẩu!", "warning", 2500, 'red');		
		}).catch(function(error) {
		  	console.log(error)
		});
	}


	render() {
		var {email,password,error} = this.state;

  		const isInvalid = email === '' || password === '';

 

		return (

			<div id="LoginForm">
			 <Notifications />
				<div className="container">
				<h1 className="form-heading text-center">ĐĂNG NHẬP NGAY</h1>
				<div className="login-form">
				<div className="main-div">
				<div className="panel">
				<h2>Người dùng đăng nhập</h2>
				<p>Please enter your email and password</p>
				</div>
				<form id="Login" onSubmit={this.SignInFrom}>

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
				<div className="forgot">
					<a href="/" onClick = {this.resetPassWord}>Forgot password?</a>
				</div>
				<button type="submit" className="btn btn-primary" disabled={isInvalid} type="submit">Đăng Nhập</button>
					{ error && <p className="signupError">{error.message}</p> }
				
				</form>
					</div>
				<p className="botto-text"></p>
				</div>
				</div>
			</div>
			);
	}
}

const mapStateToProps = (state) => {
	return{
		User: state.User
	}
}

const mapDispatchToProps = (dispatch,props) => {
	return{
		signIn: (email,password) => {
			dispatch(actions.signInRequest(email,password))
		}
	}
}
 ;
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(LoginPages));