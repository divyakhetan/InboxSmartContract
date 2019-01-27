const assert = require('assert'); //make assertions
const ganache = require('ganache-cli')
const Web3 = require('web3'); //constructor fn, thats why capitalize
const provider = ganache.provider();
const web3 = new Web3(provider);
//const web3 = new Web3(ganache.provider()); //instance, and connect to local test network
const {interface, bytecode} =require('../compile');

let accounts;
let inbox;
const initial_msg = 'hi there';
beforeEach(async() => {
//get a list of all accounts
	accounts = await web3.eth.getAccounts();
//use one of those accts to deploy the contract
	inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({data: bytecode, arguments : [initial_msg]}).send({from:accounts[0], gas:'1000000'});
	inbox.setProvider(provider);

});

describe('Inbox', () =>{
	it('deploys a contract', () => {
		//console.log(inbox);
		assert.ok(inbox.options.address); //check if deployed. ok - check if value exists
	});

	//no change to blockchain made
	it('has a default msg', async() => {
		const message = await inbox.methods.message().call();
		assert.equal(message, initial_msg);
	});

	//makes changes
	it('can change the message', async() => {
		await inbox.methods.setMessage('bye').send({from :accounts[0]}); // who will pay the gas?
		const message = await inbox.methods.message().call();
		assert.equal(message, 'bye');
	});
});