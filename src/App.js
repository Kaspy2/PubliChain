import React, { Component } from 'react'
import Web3 from 'web3'
//import getWeb3 from './utils/getWeb3'

class App extends Component {
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
				<h1> Hello, {this.web3.eth.coinbase}!</h1>
				<form method="get">
					<input type="text"></input>
					<button type="submit">Submit</button>
				</form>
			</div>
    	);
	}
}

export default App
