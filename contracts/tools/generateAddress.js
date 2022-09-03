import { LoggerFactory, WarpFactory } from 'warp-contracts';

LoggerFactory.INST.logLevel('debug');
const warp = WarpFactory.forMainnet();

const jwk = await warp.arweave.wallets.generate();
const walletAddress = await warp.arweave.wallets.jwkToAddress(jwk);

console.log(jwk);
console.log(walletAddress);
