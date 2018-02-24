import React, { Component } from 'react'
import Web3 from 'web3'
//import getWeb3 from './utils/getWeb3'

class Main extends Component {
		constructor(props){
		super(props);
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
				<h1>MAIN PAGE</h1>
                <h2> Welcome to PubliChain </h2>
			</div>
    	);
	}
}

export default Main
