import React, { Component } from 'react'
import {connect} from 'react-redux';
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
          "name": "_addr",
          "type": "address"
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
          "name": "_username",
          "type": "string"
        }
      ],
      "name": "getPublicationsByUsername",
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
      "inputs": [],
      "name": "getTopTen",
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
  return PubContract.at("0x4ac562dbcba73fae01f6e74773183cc394f98512")
}

class AuthorPage extends Component {
	constructor(props) {
		super(props);
		this.provider = new Web3.providers.HttpProvider("http://localhost:9545");
		this.web3 = new Web3(this.provider);
		
		this.PContractInstance = getPContractInstance()



    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {author_username: '', pubs: []};
    //if(this.state.author_username != null) {
      // return user results
    // }
    // else {
    //   // return top ten
    //   this.state = {pubs: []};
    //   var publications = this.PContractInstance.getTopTen
    //   .call({from: this.web3.eth.accounts[0]});
    //   console.log(publications);
    //   var pubs = []
    //   for(var i = 0; i < publications.length; i++){
    //     var ret = this.PContractInstance.getPublication.call(publications[i], {gas: 46000, from:this.web3.eth.accounts[0]});
    //     pubs.push( <div key={i}><p>{ret[0]} {ret[1]}</p></div> );
    //     console.log(i+" :: "+ret[0]);
    //   }
    //   this.state = {pubs: pubs};
    // }
  }

   handleSUsernameChange(event){
    this.setState({author_username: event.target.value});
  }

  handleSubmit(event){
    
      var publications = this.PContractInstance.getPublicationsByUsername.call(this.state.author_username,{from: this.web3.eth.accounts[0]});
      console.log(publications);
      var pubs = []
      for(var i = 0; i < publications.length; i++){
        var ret = this.PContractInstance.getPublication.call(publications[i], {gas: 46000, from:this.web3.eth.accounts[0]});
        pubs.push( <div key={i}><p>{ret[0]} {ret[1]}</p></div> );
        console.log(i+" :: "+ret[0]);
      }
      this.setState({pubs: pubs});
      event.preventDefault();
  }

	
	render() {	
		
		return (
			<div className="dapp">
        <form onSubmit={this.handleSubmit}>
          <label>
            Search By Username:
            <input type="text" value={this.state.username} onChange={(evnt) => this.handleSUsernameChange(evnt)}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
				<h1>Author: {this.state.author_username}</h1>
				<div>{this.state.pubs}</div>
			</div>
		)
	}
}
export default connect(state => state) (AuthorPage)