import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Web3 from 'web3';
//import IpfsApi from 'ipfs-api';
//import Publication from '../build/contracts/Publication.json'
const IPFS = require('ipfs-mini');
//const ipfs = new IPFS({ host: 'ipfs.infura.io', port:5001, protocol: 'https' });
const ipfs = new IPFS({ host: 'localhost', port:8080, protocol: 'https' });


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
	return PubContract.at("0x90fbc44fc6f93b773d0111b830bb27cd42292c9f")
}

class ArticleUploadForm extends Component {
  constructor(props) {
    super(props);
    this.provider = new Web3.providers.HttpProvider("http://localhost:9545");
    this.web3 = new Web3(this.provider);
    
    this.PContractInstance = getPContractInstance()
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelRef = this.handleDelRef.bind(this);
    this.handleAddRef = this.handleAddRef.bind(this);
    
    let username = this.PContractInstance.getUsername.call({from: this.web3.eth.accounts[0]});
    this.state={username: username, name: '', url: '', references_no: 0, references: [], pContract: this.pContract};

    //this.ipfsApi = IpfsApi(host: 'localhost', port:5001, {protocol: 'http'});
  }

  handleChange(event) {
    this.setState({url: event.target.value, references_no: this.state.references_no, references: this.state.references});
  }
  
  handleSubmit(event) {
    if(this.state.username === ""){
      alert("fill username bamboccu");
    }else{
        // var data;
        //  this.ipfsApi.add([this.state.url]).then((response) => {
        //    data = response[0].Hash;
        //    console.log(ipfsId)
        //  });

        //this.ipfsApi.addFromFs()

        var data;
        ipfs.add(this.state.url,
        (err, result) => {
         if(!err) {
           data = result;
           console.log("Data: "+data);
         }
         else {
          console.log("AWWWW" + err);
         }
        });
        this.PContractInstance.setUsername(this.state.author_username,{gas: 460000, from: this.web3.eth.accounts[0]});
        this.PContractInstance.addPublication(this.state.name, data, {gas: 460000, from: this.web3.eth.accounts[0]}, (err, result) => {console.log(err); console.log(result);});
        event.preventDefault();
      }
  }
  
  handleDelRef(event) {
    var newReferences = this.state.references.slice();
    newReferences.splice(this.state.references_no - 1, 1);
    if(this.state.references_no > 0) this.setState({author_address: this.state.author_address, references_no: this.state.references_no - 1, references: newReferences});
    event.preventDefault();
  }
  
  handleAddRef(event) {
    var newReferences = this.state.references.slice();
    newReferences.push('');
    this.setState({author_address: this.state.author_address, references_no: this.state.references_no + 1, references: newReferences});
    event.preventDefault();
  }
  
  handleChangeRef(event, i){
    var newReferences = this.state.references.slice();
    newReferences[i-1] = event.target.value;
    this.setState({author_address: this.state.author_address, references_no: this.state.references_no, references: newReferences});
  }
  
  handleNameChange(event){
    this.setState({name: event.target.value});
  }

  handleUsernameChange(event){
    this.setState({username: event.target.value});
  }

  // render () {
  //    return (
  //      <div>
  //        Viewing
  //        <Link to="/">
  //         <button>Go Home</button>
  //        </Link>
  //        <Link to="/articles">
  //         <button>Articles</button>
  //        </Link>
  //        <Link to="/view">
  //         <button>View Stuff</button>
  //        </Link>
  //      </div>
  //    )
  //  }
  render() {
    let refs = [];
    // for(var i = 0; i < this.state.references_no; i++){
    //   refs.push(<div>{i}<input type="text" value={this.state.references[i]} onChange={(evt) => this.handleChangeRef(evt, i)}/></div>);
    // }
  
    return (
      <div className="dapp">
      <Link to="/">
        <button>Go Home</button>
      </Link>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" value={this.state.username} onChange={(evnt) => this.handleUsernameChange(evnt)}/>
          </label>
          <label>
            Publication Name:
            <input type="text" value={this.state.name} onChange={(evnt) => this.handleNameChange(evnt)}/>
          </label>
          <label>
            URL:
            <input type="text" value={this.state.url} onChange={this.handleChange}/>
          </label>
          {refs}
          <input type="submit" value="Submit"/>
          <button id="delete_ref_button" type="del_ref" onClick={this.handleDelRef}>Delete Last Reference</button>
          <button id="add_ref_button" type="add_ref" onClick={this.handleAddRef}>Add Reference</button>
        </form>
      </div>
    )
  }
}
export default connect(state => state) (ArticleUploadForm)