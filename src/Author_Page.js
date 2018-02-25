import React, { Component } from 'react'
import Web3 from 'web3'

function getPContractInstance() {
	let provider = new Web3.providers.HttpProvider("http://localhost:9545");
	let web3 = new Web3(provider);
	let PubContract = web3.eth.contract([
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "publications",
      "outputs": [
        {
          "name": "pubNum",
          "type": "uint128"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "data",
          "type": "string"
        },
        {
          "name": "date",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_name",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "_addr",
          "type": "address"
        }
      ],
      "name": "PublicationAdded",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "setUsername",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getUsername",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "_data",
          "type": "string"
        }
      ],
      "name": "addPublication",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_username",
          "type": "string"
        }
      ],
      "name": "getPublications",
      "outputs": [
        {
          "name": "",
          "type": "uint128[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_publicationNumber",
          "type": "uint128"
        }
      ],
      "name": "getPublication",
      "outputs": [
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_publicationNumber",
          "type": "uint128"
        }
      ],
      "name": "getData",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getPs",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]);
	return PubContract.at("0xfb88de099e13c3ed21f80a7a1e49f8caecf10df6")
}

class AuthorPage extends Component {
	constructor(props) {
		super(props);
		this.provider = new Web3.providers.HttpProvider("http://localhost:9545");
		this.web3 = new Web3(this.provider);
		
		this.PContractInstance = getPContractInstance()
		
		this.state = {author_username: '', pubs: []};
		
		let publications = this.PContractInstance.getPublications.call(this.state.author_username,{from: this.web3.eth.accounts[0]});
		let pubs = []
		for(var i = 0; i < publications.length; i++){
			let ret = this.PContractInstance.getPublication.call(publications[i], {from:this.web3.eth.accounts[0]});
			pubs.push(<div key={i}><p>{ret[0]} {ret[1]}</p></div>);
		}
		this.state = {author_username: '', pubs: pubs};
	}
	
	render() {	
		
		return (
			<div className="dapp">
				<h1>Author: {this.state.author_username}</h1>
				<div>{this.state.pubs}</div>
			</div>
		)
	}
}
export default AuthorPage