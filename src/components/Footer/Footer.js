import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
class Footer extends React.Component {
  render() {
    return (
     		<footer className="footer-distributed">
			<div className="footer-left">

				<img src="../img/logo2.png" alt="logo chat room"/>
				
				<p className="footer-links">
					<Link to="/">Home</Link>
					·
					<Link to="/">Blog</Link>
					·
					<Link to="/">Pricing</Link>
					·
					<Link to="/">About</Link>
					·
					<Link to="/">Faq</Link>
					·
					<Link to="/">Contact</Link>
				</p>

				<p className="footer-company-name">Company Name &copy; 2018</p>
			</div>

			<div className="footer-center hidden-xs hidden-sm">

				<div>
					<i className="fa fa-map-marker"></i>
					<p><span>543/12 Tôn Đức Thắng</span> Hòa Khánh, Đà Nẵng</p>
				</div>

				<div>
					<i className="fa fa-phone"></i>
					<p>0983.497.936</p>
				</div>

				<div>
					<i className="fa fa-envelope"></i>
					<p>tuananhcntt96@gmail.com</p>
				</div>

			</div>

			<div className="footer-right hidden-xs hidden-sm">

				<p className="footer-company-about">
					<span>About the company</span>
					Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
				</p>

				<div className="footer-icons">

					<Link to="/"><i className="fa fa-facebook"></i></Link>
					<Link to="/"><i className="fa fa-twitter"></i></Link>
					<Link to="/"><i className="fa fa-linkedin"></i></Link>
					<Link to="/"><i className="fa fa-github"></i></Link>

				</div>

			</div>

		<div className="scroll-top-wrapper ">
			  <span className="scroll-top-inner">
			    <i className="fa fa-2x fa-arrow-circle-up"></i>
			  </span>
		</div>
		
		</footer>
		
    );
  }
}

export default Footer