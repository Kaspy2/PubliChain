pragma solidity ^0.4.18;

contract Publication {
  uint storedData;
  string name;

  function set(uint _x, string _name) public {
  	while(true) {
  		storedData = 1;
  	}
    storedData = _x;
    name = _name;
  }

  function getData() public view returns (uint) {
    return storedData;
  }

  function getName() public view returns (string) {
    return name;
  }
}

// Publication.deployed().then(function(instance){return instance.set(69420,"IIIIIID-DYLLU");});
// Publication.deployed().then(function(instance){return instance.getData.call();}).then(function(value){return value.toNumber()});
// Publication.deployed().then(function(instance){return instance.getData.call();}).then(function(value){return value.toNumber()});
