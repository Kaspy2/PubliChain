import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import App from './containers/App';
import About from './components/About';
import Articles from './components/Articles';
import ArticleUploadForm from './components/AddPub';
import AuthorPage from './components/SearchView';
export default () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={App}/>
				<Route path='/view' component={AuthorPage}/>
				<Route path='/authors' component={ArticleUploadForm}/>
			</Switch>
		</BrowserRouter>
	)
}

// <Route path='/about' component={About}/>
// <Route path='/articles' component={Articles}/>