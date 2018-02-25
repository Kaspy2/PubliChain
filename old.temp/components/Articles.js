import React from 'react';
import {Link} from 'react-router-dom';
import "./css/few.less";

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
			<div>
				About
				<Link to="/">
					<button>Home</button>
				</Link>
				<div class="dapp">
					<h1>Article Page</h1>
					<div id="url" >Url: {this.url}</div>
					<div id="Authors" >Authors: {this.author}</div> 
					<div id="Refs" >References: {this.ref}</div>
					<div id ="Button" ><button type="Donate/Buy">Donate/Buy</button></div>
					<div id="RefBy:" >Referenced by: {this.refBy}</div>
					<p>Ayy lmao</p>
				</div>
			</div>
		)
	}
}