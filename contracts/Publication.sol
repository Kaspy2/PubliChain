pragma solidity ^0.4.18;

// import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";

//contract Publication is Ownable{
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

	string username;	// username

	struct Pub{
		uint128 pubNum;	// publication id
		string name;	// name of publication
		string data;	// data / publication itself - hash
		uint date;		// date of publication
	}

	event PublicationAdded(string _name, address _addr);

	mapping (address => string) user;		// address -> username
	mapping (string => address) userAddress;// username ->	
	mapping (uint128 => address) author;	// pub num -> author
	mapping (address => uint16) numberOfPublications;	// address -> number of pubs
	
	Pub[] public publications; 				// list of publications
	
	function setUsername(string _name) public
	// onlyOwner
	{
		if (userAddress[_name] != address(0)) {
			userAddress[_name] = address(0);
		}
		username = _name;
		userAddress[_name] = msg.sender;
		user[msg.sender] = _name;
	}

	function addPublication(string _name, string _data) public {
		author[uint128(publications.length)] = msg.sender;
		publications.push(Pub(uint128(publications.length),_name, _data, now));
		numberOfPublications[msg.sender]++;
		PublicationAdded(_name, msg.sender);
	}

	function _getOwnPublications() private view 
	// onlyOwner 
	returns(string[]) {
		string[] memory pubNames = new string[](numberOfPublications[msg.sender]);
		uint16 c = 0;
		for (uint i = 0; i<publications.length; i++) {
			if(author[publications[i].pubNum] == msg.sender) {
				pubNames[c] = publications[i].name;
				c++;
			}
		}
	}

	function getPublications(string _username) public view returns(uint128[]){
		uint128[] memory pubNums = new uint128[](numberOfPublications[msg.sender]);
		uint16 c = 0;
		for (uint i = 0; i<publications.length; i++) {
			if(author[publications[i].pubNum] == userAddress[_username]) {
				pubNums[c] = publications[i].pubNum;
				c++;
			}
		}
		return pubNums;
	}

	function getPublication (uint128 _publicationNumber) public view returns(string,string,uint) {
		for (uint128 i = 0; i<publications.length; i++) {
			if(publications[i].pubNum == _publicationNumber) {
				return (publications[i].name, publications[i].data, publications[i].date);
			}
		}
	}

	function getData (uint128 _publicationNumber) public view returns(string) {
		for (uint128 i = 0; i<publications.length; i++) {
			if(publications[i].pubNum == _publicationNumber) {
				return publications[i].data;
			}
		}
	}

	function getPs () public view returns (string) {
		require (publications.length >= 1);
		return publications[0].name;
	}
}

// Publication.deployed().then(function(instance){return instance.addPublication("69420","IIIIIID-DYLLU");});
// Publication.deployed().then(function(instance){return instance.getData.call();}).then(function(value){return value.toNumber()});
// Publication.deployed().then(function(instance){return instance.getData.call();}).then(function(value){return value.toNumber()});

// Publication.deployed().then(function(instance){return instance.getPublications.call();}).then(function(value){return value.toNumber()});

// Publication.deployed().then(function(instance){return instance.getPublications("Dylon");}).then(function(value){return value[0].toNumber()})

// Publication.deployed().then(function(instance){return instance.addPublication("NameOfPub","Data/Hash");});
// Publication.deployed().then(function(instance){return instance.getPublications("Dylon");}).then(function(value){return value[2].toNumber()})


// name, string (article) -> genHash() -> addPublication(name, hash)
// pubID -> getData() -> display [no need to show hash]
// references