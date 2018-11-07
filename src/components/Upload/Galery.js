import React from 'react';
import {connect} from 'react-redux';
import * as actions from './../../actions/index';

class Galery extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      images: {}

    }
  }

  //Get list file
  componentWillMount(){
    this.props.getListImages();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps){
      this.setState({
        images: nextProps.images
      })
    }
  }

  
  
  render() {
  	const {images} = this.state;
  	const imgs = Object.keys(images);
  	var list = [];
  	if(imgs.length > 0){
  	   list = imgs.map((id) =>{ 
  	        return (
  	        	<div className="item-img" key={id}>
  	        		 <a data-fancybox="gallery" href={images[id].url}><img src={images[id].url} alt={images[id].names} /></a>
  	        	</div>
  	        )
  	       
  	    })
  	 }
  	
    return (
      <div className="row Galery">
      	{list}
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
    getListImages: () => {
      dispatch(actions.getListImageRequest());
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Galery)