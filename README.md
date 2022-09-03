# AR place documentation

ARplace - decentralized announcements platform without 3rd party's fees and regulations.

SmartContract WARP address: Z_2TgMpZv9YgfVim1FFliXpsmQj5YU37qEiEu0gejCI

## Architecture

The project contains 3 subprojects divided into directories:
- api
- contracts
- web-app

### API
API for featching announcements from specific smart contract on WARP network. wep-app is API consumer.

### Contracts
The folder contains smart contracts source code and toolset for generating arweave wallets and deploying smart contracts to ARweave blockchain.

#### Web APP (./web-app)
The folder contains React SPA (Single Page Application) web app for presenting and adding announcements with ARConnect browser wallet.

## How to run ARPlace ?

### 0. Generate ARWeave wallet and remember/save the details. Please store JWT in a save place.

```bash
$ cd contracts/
$ node tools/generateAddress.js
```

Save JWT generated in the console to:
a) `./contracts/jwt.json`
b) `./api/.env` (minified in one line, based on `./api/.env.example`)

### 1. Upload the WARP smart contract to ARWeave.

```bash
$ cd contracts/
$ node tools/deploy.js
```
### 2. To add your smart contract address generated in the console to the frontend and backend.

a) Frontend - to the `./web-app/src/consts.js` file.
b) Backend/API - to the `./api/.env` file (based on ./api/.env.example)

### 3. To run backend.

```bash
$ cd ./api/
$ npm start
```

### 4. To run frontend.

```bash
$ cd ./web-app/
$ npm start
```

### Voilà! It's ready to add some announcements!


# TODO
- get rid of `./api` part
- Adding 'Pick-Up location' field
- To skip ARweave Gateway usage
