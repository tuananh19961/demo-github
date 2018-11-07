import React from 'react';
import firebase from './../../firebase';
import {connect} from 'react-redux';
import * as actions from './../../actions/index';
import randomstring from 'randomstring';

const storage = firebase.storage();
var user = localStorage.getItem('user');

class UploadInput extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			image: null,
			url:'',
			progress: 0
		}
	}
	
	//Upload file
	saveImageInList = (image,url) => {
		var imageDB = {
			id: Date.now(),
			user: user,
			image: image.name,
			url:url
		}
		this.props.upLoadImageDB(imageDB);
	}

	onChange = (event) => {
		if(event.target.files[0]){
			const image = event.target.files[0];
			this.setState({
				image: image
			});
		}
	}

	onHandleUpLoad = () => {
		const {image} = this.state;

		if(image){
			var randString = randomstring.generate(7);
			var imgName = `${image.name}-${randString}`;
		const uploadTask = storage.ref(`images/${imgName}`).put(image);
		uploadTask.on('state_changed',
				(snapshot) => {
				const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
				this.setState({
					progress:progress
				});
				},
				(error) => {
					console.log(error)
				},
				() => {
					storage.ref('images').child(imgName).getDownloadURL().then((url) => {
						this.saveImageInList(image,url);
						this.setState({
							url: url
						})
				});
			}
		);
		}else{
			alert('Bạn chưa chọn ảnh!')
		}
	}

	
  render() {
  	var {progress} = this.state;
    return (
      <div className="inputField">

      	<div className="progress">
			  <div 
			  className="progress-bar progress-bar-success progress-bar-striped" 
			  role="progressbar"
			   aria-valuenow={progress}
			   aria-valuemin="0" 
			   aria-valuemax="100" 
			  style={{
			  	'minWidth': '2em', 'width': `${progress}%`
			  }}>
			    {`${progress}%`}
			  </div>
		</div>

	      <div className="form-group">
	      	<input type="file" name="" className="form-control" onChange={this.onChange}/>
	      </div> 
	      <br />
	      
      	<button type="button" className="btn btn-warning" onClick={this.onHandleUpLoad}><i className="fa fa-upload"></i> Upload</button>

      	<br />

      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		images: state.Upload
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		upLoadImageDB: (image) => {
			dispatch(actions.uploadImageRequest(image));
		},
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(UploadInput)