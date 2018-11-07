import React from 'react';
import './profile.css';
import {connect} from 'react-redux';
import * as actions from './../../actions/index';
import Notifications, {notify} from 'react-notify-toast';

class ProfilePage extends React.Component {
	componentDidMount(){
		  this.props.getUserProfile();
	}

	onChange = (event) => {
		var image = event.target.files[0];
        if(image){
            this.props.updateUserImage(image);
        }
        else{
            alert('Bạn chưa chọn hình!');
        }
		
	}

    componentWillReceiveProps(nextProps){
          if(nextProps.User.process !== null && nextProps.User.process === true){
            notify.show("Cập nhật ảnh đại diện thành công!", "success", 2000, 'red');
        }
    }

  render() {
  	var {User} = this.props;

  

    return (
     <div className="container-fluid emp-profile">
            <Notifications />
            <form onSubmit = {this.editImage}>
                <div>
                   
                    <div className="col-md-4">
                        <div className="profile-img">
                            <img src={User ? User.photoURL : ''} alt="" />
                            <div className="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file" onChange={this.onChange} accept="image/*"/>
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                                    <h2>
                                    	{User ? User.displayName : ''}
                                    </h2>
                                    <h6>
                                        Web Developer and Designer
                                    </h6>
                                    <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div className="col-md-4">
                    	
                    </div>

                    <div className="col-md-8">
                         <div>
                                        <div>
                                            <div className="col-md-6">
                                                <label>User Id</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{User ? User.uid : ''}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{User ? User.displayName : ''}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{User ? User.email : ''}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>123 456 7890</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="col-md-6">
                                                <label>Profession</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Web Developer and Designer</p>
                                            </div>
                                        </div>
                            </div>
                    </div>
                </div>
            </form>           
        </div>

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
		updateUserImage: (image) => {
			dispatch(actions.updateUserImageRequest(image))
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage)