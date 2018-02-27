pragma solidity ^0.4.18;

import "doggiefeeding.sol";

contract DoggieHelper is DoggieFeeding {
	// Is our doggie above a certain level?
	uint levelUpFee = 0.001 ether;
	modifier aboveLevel(uint _level, uint _doggieId) {
		require(doggies[_doggieId].level >= _level);
		_;
	}

	function changeName(uint _doggieId, string _newName) external aboveLevel(2, _doggieId) ownerOf(_doggieId) {
		doggies[_doggieId].name = _newName;
	}

	function withdraw() external onlyOwner {
		// this balance always refers to total balance on contract
		owner.transfer(this.balance);
	}

	function setLevelUpFee(uint _fee) external onlyOwner {
		levelUpFee = _fee;
	}

	function getDoggieByOwner(address _owner) external view returns(uint[]) {
		uint[] memory result = new uint[](ownerDoggieCount[_owner]);
		uint counter = 0;
		for (uint i = 0; i<doggies.length; i++) {
			if(doggieToOwner[i] == owner) {
				result [counter] = i;
				counter ++;
			}
		}
	}
}

/*
contract OnlineStore {
	function buySomething() external payable{
		require(msg.value == 0.001 ether);
		transferThing(msg.sender);
	}
}

OnlineStore.buySomething({from: web3.eth.defaultAccount, value:web3.utils.toWei(0.001)});
*/



/*
migration files, artifacts
var DoggieFactory = artifacts.require("./DoggieFactory.sol");
module.exports = function(deployer) {
	deployer.deploy(DoggieFactory, _params_);
}

truffle init
-truffle unbox react
truffle compile
(ganache) or other test rpc
truffle develop
> migrate --reset
npm start		// incognito to use test rpc instead of metamask

- can access contracts and methods from App.js


*/