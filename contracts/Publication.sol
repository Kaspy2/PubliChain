pragma solidity ^0.4.18;

contract Publication {
	// uint storedData;
	// string name;


	// function set(uint _x, string _name) public {
	// 	while(true) {
	// 		storedData = 1;
	// 	}
	//   storedData = _x;
	//   name = _name;
	// }

	// function getData() public view returns (uint) {
	//   return storedData;
	// }

	// function getName() public view returns (string) {
	//   return name;
	// }

	struct Pub{
		string name;
		string data;
		uint date;
	}

	mapping (address => string) users;
	mapping (string => address) authors;
	Pub[] public publications; 
	string name;

	function _setUsername(string _name) private{
		users[msg.sender] = _name;
	}

	function _addPublication(string _name, string _data) private{
		authors[_name] = msg.sender;
		publications.push(Pub(_name, _data, now));
	}



}

// Publication.deployed().then(function(instance){return instance.set(69420,"IIIIIID-DYLLU");});
// Publication.deployed().then(function(instance){return instance.getData.call();}).then(function(value){return value.toNumber()});
// Publication.deployed().then(function(instance){return instance.getData.call();}).then(function(value){return value.toNumber()});
