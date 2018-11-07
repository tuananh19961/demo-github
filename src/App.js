import React, { Component } from 'react';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import routes from './routes';
import {BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom';
import LoginPages from './pages/LoginPage/LoginPages';
import { createBrowserHistory as history } from 'history';
import SignUp from './pages/SignUpPage/SignUp';

import ErrorPage from './components/Error/ErrorPage';


const PrivateRoute = (props) => {
	const user = localStorage.getItem('user');
	return user === null ? <Redirect to="/" /> : <Route {...props} />
}

class App extends Component {

	getContent = (routes) => {
		var result = [];
		if(routes.length > 0){
			result = routes.map((route,index) => {
				return <PrivateRoute path={route.path} exact={route.exact} component={route.main} key={index}/>
			});
		}
		return result
	}


  render() {	

    return (  
    	<Router>
		      <div>

		      	<Menu />
		      			<Switch>
		      				<Route path="/" exact={true} component={LoginPages} history={history}/>

			   				{this.getContent(routes)}

			   				<Route path="/sign-up" exact={true} component={SignUp}/>
			   				
			   				<Route path="" exact={true} component={ErrorPage}/>
			   			</Switch>
		        <Footer />
		        
		      </div>
      </Router>
    );
  }
}

export default App;
