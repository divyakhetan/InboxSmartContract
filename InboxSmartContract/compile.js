const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

//will put the compiled code in another file.
module.exports = solc.compile(source, 1).contracts[':Inbox']; //no.of programs to compile.