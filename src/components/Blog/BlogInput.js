import React from 'react';
import './blog.css';

class BlogInput extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			articel: '',
			img: null,
			imagePreviewUrl: ''
		}
	}


	//Bắt sự kiện onchange
	onHandleChange = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.type === "file" ? target.files[0] : target.value;
		this.setState({
			[name] : value
		});


		//Preview image
		if(target.files){
			let reader = new FileReader();
	    	let file = target.files[0];

			 reader.onloadend = () => {
			      this.setState({
			        img: file,
			        imagePreviewUrl: reader.result
			   });
	    	}
	    	reader.readAsDataURL(file)
		}
		
	}

	//Bắt sự kiện submit form gửi bài viết
	onHandleArticel = (event) => {
		event.preventDefault();
		var {articel,img} = this.state;
		if(articel || img){
			var blog = {
				articel,img
			}
			this.props.articel(blog);
		}
		this.setState({
			articel: '',
			imagePreviewUrl: null,
			img: null
		})
		this.fileInput.value = "";
	}

	onHandleAdd = (event) => {
		document.getElementById('img-post').click();
	}

	//Xóa ảnh hiện tại trong state
	reMoveImg = () => {
		this.setState({
			imagePreviewUrl: null,
			img: null
		})
		this.fileInput.value = "";
	}

  render() {
  	var {user} = this.props;
  	var {articel,imagePreviewUrl} = this.state;
  	var showImage = null;

  	if(imagePreviewUrl){
  		showImage = ( 
  			<div className="box-preview">
	  			<i className="fa fa-times remove" onClick={this.reMoveImg}></i>
	  			<a href={imagePreviewUrl} className="thumbnail" data-fancybox="gallery">
	  				<img className="img-thumb" src={imagePreviewUrl}/>
	  			</a>
  			</div>
  			) 
  	}

    return (
      <div className="post-form">
  			<div className="header-form">
  				<span><i className="fa fa-pencil"></i> Thêm bài viết</span>
  			</div>
      		<form onSubmit={this.onHandleArticel}>
               <div className="form-group post-articel">
               	  <img className="img-form" src={user.photoURL} alt={user.displayName}/>
                  <textarea 
		                  name="articel" 
		                  id="input" 
		                  className="form-control" 
		                  rows="3" 
		                  required="required" 
		                  placeholder="Bạn đang nghĩ gì?"
		                  onChange={this.onHandleChange}
		                  value={articel}
		                  wrap="soft"
		           >

                  </textarea>
               </div>

               <div className="footer-form">
               		<div className="preview-image">
               			 {showImage}
               		</div>

					<button type="submit" className="btn btn-success share"><i className="fa fa-share pr-5"></i> Chia sẽ</button>
					<button type="button" className="post-image" onClick={this.onHandleAdd}><i className="fa fa-picture-o"></i></button>
					<input 
						type="file" 
						name="img" 
						id="img-post" 
						className="img-post" 
						onChange={this.onHandleChange}
						ref={ref => this.fileInput = ref}
					/>
               </div>

            </form>
      </div>
    );
  }

}

export default BlogInput