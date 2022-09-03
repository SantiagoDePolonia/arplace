
var fs = require('fs');
var path = require('path');

var WP = require('warp-contracts');

// Set up Warp instance for Arweave mainnet
WP.LoggerFactory.INST.logLevel('debug');

const warp = WP.WarpFactory.forMainnet();

// Set up Arweave client
// const arweave = warp.arweave;

const jwk = JSON.parse(fs.readFileSync(
    path.join(__dirname, '../jwt.json'),
    'utf8'
));

const contractSrc = fs.readFileSync(
    path.join(__dirname, '../arplace.js'),
    'utf8'
);
  
const initialState = fs.readFileSync(
    path.join(__dirname, '../arplace.json'),
    'utf8'
);

warp.createContract.deploy({
    wallet: jwk,
    initState: JSON.stringify(initialState),
    src: contractSrc,
}).then(({contractTxId}) => {
    console.log(contractTxId);
});
