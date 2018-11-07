import React from 'react';
import './menu.css';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import * as actions from './../../actions/index';

class Menu extends React.Component {

 	signOut = () =>{
 		this.props.signOut();
	 	var {history} = this.props;
	 	history.push('/');	
	}

	 componentWillMount(){
	 	this.props.getUserProfile();
	 }


 	render() {
	  	var name = localStorage.getItem('name');
	  	var id = localStorage.getItem('user');
		var {User} = this.props;

    return (
		<nav className="navbar navbar-inverse menu" role="navigation">
			<div className="container-fluid">
			<div className="navbar-header">
				<button type="button" className="navbar-toggle pull-right" data-toggle="collapse" data-target=".navbar-ex1-collapse">
					<span className="sr-only">Toggle navigation</span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
				</button>
				<Link className="navbar-brand" to="/chat-room">
	                <span>C</span>hat
	                <span>R</span>oom
				</Link>
			</div>


			<div className="collapse navbar-collapse navbar-ex1-collapse">

				 <ul className="nav navbar-nav">
			        <li><Link to='/chat-room'><span className="glyphicon glyphicon-heart"></span> Chat Room</Link></li>
				    <li><Link to='/galery'><span className="glyphicon glyphicon-camera"></span> Galery</Link></li>
      			</ul>

				<ul className="nav navbar-nav navbar-right">
							{User.loggedIn 
								? 
								<li className="dropdown">
									<Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> 
									<img className="avata-small" src={User.photoURL} alt={name}/> <b className="username">{name}</b> <span className="caret"></span>
									 </Link>
									 <ul className="dropdown-menu">
									 		<li><Link to={`/profile/${id}`}> <i className="fa fa-user"></i> Trang cá nhân</Link></li>
 											<li><Link to="#" onClick={this.signOut}><i className="fa fa-sign-out"></i> Đăng xuất</Link> </li>
									 </ul>
								</li> 
								: 
								<li><Link to='/sign-up'><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>}
				</ul>

			</div>
		</div>
	</nav>
    );
  }
}
const mapStateToProps = (state) => {
	return {
		User : state.User
	}
}
const mapDispatchToProps = (dispatch,props) => {
	return {
		getUserProfile: () => {
			dispatch(actions.getUserProfileRequest());
		},
		signOut: () => {
			dispatch(actions.signOutRequest())
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Menu))