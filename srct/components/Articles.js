import React from 'react';
import {Link} from 'react-router-dom';
//import './css/back.jpg';
//import "./css/articles.less";

export default 
class About extends React.Component {
	constructor(props){
	    super(props);
	    this.author = "GENERIC AUTHOR";
	    this.url = "url";
	    this.ref = "ref";
	    this.refBy = "refBy";
	}
	render () {
		return (
			<div className="dapp">
				<h1>Article Page</h1>
				<ul>
					<li><div id="url" >Url: {this.url}</div></li>
					<li><div id="Authors" >Authors: {this.author}</div></li>
					<li><div id="Refs" >References: {this.ref}</div></li>
					<li><a href="./">
					<div id = "Button">
						Donate<div id="img"></div>
					</div>
					</a></li>
					<li><div id="RefBy:" >Referenced by: {this.refBy}</div></li>
				</ul>
			</div>
    	);
	}
}