pragma solidity ^0.4.18;

import "./node_modules/zeppelin/contracts/ownership/Ownable.sol";

contract DoggieFactory {
	// uint myInt = 1337; //uint256
	// uint myWeirdInt = 10**3; //=1000 // or + - * / %
	uint dnaDigits = 8;
	uint dnaModulus = 10 ** dnaDigits;
	int cooldownTime = 1 hours;

	event DoggieAdded(string _name, uint _dna);

	uint lastUpdated;


	function updateTimestamp() public{
		lastUpdated = now;
	}

	function fiveMinutesHavePassed() public view returns(bool) {
		return (now>= _doggie.lastUpdated);
	}

	struct Doggie{
		string name;
		uint dna;
		uint32 level;		// doggie level
		uint32 readyTime; 	// timestamp, when doggie will be ready to do something
	}



	// uint[2] fixedArray;
	// string[5] stringArray;
	Doggie[] public doggies;

	// mapping (address => uint) accountBalance;
	mapping (uint => address) doggieToOwner;
	mapping (address => uint) ownerDoggieCount; 
	//address myAddress = 0x

	// to be triggered after doggie action
	function _triggerCooldown(Doggie storage _doggie) internal {
		_doggie.readyTime = uint32(now+cooldownTime);
	}

	function _isReady (Doggie storage _doggie) internal returns (bool) {
		return (_doggie.readyTime <= now);
	}


	//public, private, internal, external
	function _createDoggie(string _name, uint _dna) internal {
		// Doggie myDoggie = Doggie("Oskar",1234513432432);
		// doggies.push(myDoggie);
		uint id = doggies.push(Doggie(_name, _dna, 1, uint32(now+cooldownTime))) - 1;
		DoggieAdded(_name, _dna);
		//msg.sender //address
		ownerDoggieCount[msg.sender]++;
		doggieToOwner[id] = msg.sender;
	}


	// assert vs require


	// string greeting = "woof!";
	// function sayHello() public view returns(string) {	// view function
	// 	return greeting;
	// }

	// function _multiple(uint a, uint b), public pure returns (uint){	// pure function
	// 	return a*b;
	// }

	// uint8 x = 8;
	// uint16 y = 22;
	// uint16(y); //typecast
	function _generateRandomDna (string _str) private view returns (uint) {	// view / constant
		uint rand = uint(keccak256(_str));	// we truncate to dnaDigits
		return rand % dnaModulus;
	}

	function createRandomDoggie(string _name) public{
		require(ownerDoggieCount[msg.sender] == 0);
		uint randDna = _generateRandomDna(_name);
		_createDoggie(_name,randDna);
	}


	// function sayHiToOskar (string _name) public returns(string){
	// 	require(keccak(_name) == keccak256("Oskar"));
	// 	return "Hi!";
	// }

	// event IntegerMultiplied(uint x, uint y, uint result);
	// function _add(uint x, uint y) private {
	// 	uint result = x*y;
	// 	IntegerMultiplied(x,y,result);
	// }
	
}

/*

In [1]: from hashlib import sha256

In [2]: from hashlib import md5

In [3]: md5('Hello Malta').hexdigest()
Out[3]: '4132e2a37abfac9fab3a3de4e4d07f85'

*/

//use the box

/*
typical error another diary thing urge report silent lunch fog absent faith
*/

// multiple return vals

// modifiers

/* time

uint cooldown = 5 minutes;
now;


*/