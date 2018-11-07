import React from 'react';
import './blog.css';
import {Link} from 'react-router-dom';

class BlogItem extends React.Component {

  render() {
    var {article} = this.props;
    var {user} = article;
    var image = null

    if(article.img){
      image = (
        <div className="box-image-blog">
            <img src={article.img} className="img-responsive"/>
        </div>
      );
    }

    return (
      <div className="item-blog">
      		<div className="blog-wrapper">
      			<div className="header-article">
      				<img src={user ? user.avatar : ''} alt="" />
      				<div className="user-post">
      					<Link to="#" ><b>{user ? user.name : ''}</b></Link>
      					<i>{article.date}</i>
      				</div>
      			</div>

      			<div className="body-article">
              <div>
                {image}
              </div>
      				<p>{article.text}</p>
      			</div>

      			<div className="article-action">
      				<Link to="#" className="item-action" href="/">
      					<i className="fa fa-heart-o pr-5"></i>
      					<span>Thích</span>
      				</Link>

      				<Link to="#" className="item-action" href="/">
      					<i className="fa fa-comment-o pr-5"></i>
      					<span>Bình luận</span>
      				</Link>

      				<Link to="#" className="item-action" href="/">
      					<i className="fa fa-share-alt pr-5"></i>
      					<span>Chia sẽ</span>
      				</Link>
      			</div>
      		</div>
      </div>
    );
  }
}

export default BlogItem