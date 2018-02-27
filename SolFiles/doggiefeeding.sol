pragma solidity ^0.4.18;

import "./doggiefactory.sol";

contract KittyInterface { // interface
	 function getKitty(uint256 _id)
        external
        view
        returns (
        bool isGestating,
        bool isReady,
        uint256 cooldownIndex,
        uint256 nextActionAt,
        uint256 siringWithId,
        uint256 birthTime,
        uint256 matronId,
        uint256 sireId,
        uint256 generation,
        uint256 genes
	);
}

contract DoggieFeeding is DoggieFactory{
	// address cryptoKittyAddress = 0x06012c8cf97bead5deae237070f9587f8e7a266d;
	KittyInterface kittyContract = KittyInterface(cryptoKittyAddress);
	function dnaSplicing() public{
		uint doggieDna = 2222;
		uint targetDna = 5555;
		uint newDna = (doggieDna - targetDna) / 2;
	}

	modifier onlyOwner() {
		require(msg.sender==owner);
	}

	function setKittyContractAddress(address _address) internal onlyOwner {
		kittyContract = KittyInterface(_address);
	}

	modifier ownerOf(uint _doggieId) {
		require(doggieToOwner[_doggieId] == msg.sender);
		_; // continue execution
	}

	// a doggie action which should trigger cooldown on execution
	function feedAndMultiply(uint _doggieId, uint targetDna) internal ownerOf(_doggieId){
		Doggie storage myDoggie = doggies[_doggieId];
		require(_isReady(myDoggie));
		_targetDna = _targetDna % dnaModulus;
		uint newDna = (myDoggie.Dna + _targetDna) / 2;
		// msg.sender._createDoggie("NoName", newDna);
		_createDoggie("NoName", newDna);
		_triggerCooldown(myDoggie);
	}

	function eatKitty(uint _doggieId, uint _kittyId) public {
		uint kittyDna;
		(,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);
		feedAndMultiply(_doggieId, kittyDna);
	}


}

// struct packing (state size of integers) - gas

// multiple returns => (,,c) = mulret();