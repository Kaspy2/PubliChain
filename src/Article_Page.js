import React, { Component } from 'react'
import Web3 from 'web3'
//import getWeb3 from './utils/getWeb3'

class Article_Page extends Component {
    
		constructor(props){
        super(props);
        this.author = "GENERIC AUTHOR";
        this.url = "url";
        this.ref = "ref";
        this.refBy = "refBy";

		//if(typeof web3 !== 'undefined'){
		//	console.log("Using web3 detected from external source like Metamask");
		//	this.web3 = new Web3(web3.currentProvider)
		//}else{ 
			this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"))
		//}
	}
	
	render() {	  
		return (
			<div class="dapp">
				<h1>Article Page</h1>
                <div id="url" >Url: {this.url}</div>
                <div id="Authors" >Authors: {this.author}</div> 
                <div id="Refs" >References: {this.ref}</div>
                <div id ="Button" ><button type="Donate/Buy">Donate/Buy</button></div>
                <div id="RefBy:" >Referenced by: {this.refBy}</div>
			</div>
    	);
	}
}

export default Article_Page
