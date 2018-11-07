import React from 'react';
import ChatSection from './../ChatSection'
import BlogInput from './../../components/Blog/BlogInput';
import BlogItem from './../../components/Blog/BlogItem';
import {connect} from 'react-redux';
import { postArticleRequest, getListArticleRequest } from './../../actions/index';
import Notifications, {notify} from 'react-notify-toast';
import './blog.css';

class BlogPage extends React.Component {
  
  onHandleArticel = (data) => {
    var {User} = this.props;
    var date = new Date().toLocaleDateString();
    var hour = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});

    
    var currentUser = {
      uid: User.uid,
      name: User.displayName,
      avatar: User.photoURL
    }

    if(data){
      var article = {
        id: Date.now(),
        user: currentUser,
        text: data.articel,
        img: data.img,
        date: `${date} lúc ${hour}`
      }
      this.props.postArticle(article);
      notify.show("Đăng bài thành công!", "success", 2000, 'red');
    }
  }

  componentDidMount(){
    this.props.getListArticle();
  }

  render() {
    var {User,Blog} = this.props;
    var ids = Object.keys(Blog);
    var listArticle = []
      if(ids.length > 0){
        listArticle = ids.map( (id) => {
            return <BlogItem article = {Blog[id]} key={id}/>
        }).reverse();  
      }
      
    return (
      <div className ="Blog">
       <Notifications />
          <div className="container">
          	<div className="row">

          		<div className="col-md-8">
          			 <div className="blog-section">
                      <BlogInput user = {User} articel = {this.onHandleArticel}/>

                      <div className="list-article">

                        {listArticle}
            
                      </div>
                 </div>
          		</div>

          		<div className="col-md-4">

          			<ChatSection />

          		</div>

          	</div>
          	</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    User : state.User,
    Blog: state.Blog
  }
}

const mapDispatchToProps = (dispatch,props) => {
  return {
    postArticle : (article) => {
        dispatch(postArticleRequest(article));
    }
    ,
    getListArticle: () => {
      dispatch(getListArticleRequest())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BlogPage)