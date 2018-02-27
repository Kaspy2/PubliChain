import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import App from './containers/App';
import About from './components/About';
import Articles from './components/Articles';
export default () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={App}/>
				<Route path='/about' component={About}/>
				<Route path='/articles' component={Articles}/>
			</Switch>
		</BrowserRouter>
	)
}