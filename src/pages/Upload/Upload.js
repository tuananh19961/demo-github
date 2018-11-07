import React from 'react';
import UploadInput from './../../components/Upload/UploadInput';
import Galery from './../../components/Upload/Galery';
import './upload.css';

class Upload extends React.Component {
  render() {

    return (
    	<div className="container">
	      <div className="inputImage">
			      <div className="text-center">
			      	<UploadInput />
              <Galery />
			      </div>
	      </div>
      </div>
    );
  }
}

export default Upload