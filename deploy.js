const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
	 'else verb monkey admit toy zone evoke wonder table jeans civil mesh', 
	 'https://rinkeby.infura.io/v3/4adfc92dfc11493798430f0d5d720822'
);
const web3 = new Web3(provider);

const deploy = async() => {
	const accounts = await web3.eth.getAccounts();
	console.log('attempting to deploy ', accounts[0]);
	const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({data: '0x' + bytecode, arguments: ['Hi there']}).send({gas: '1000000', from :accounts[0]  });
	console.log('address', result.options.address);
};

deploy();