# ETH20

[ ![Codeship Status for skmgoldin/ETH20](https://app.codeship.com/projects/ea15e410-982b-0135-9cd3-4ae5c5c5aaac/status?branch=master)](https://app.codeship.com/projects/251984)

Convert Ether into an Ether-backed ERC20 token.

## How it works

ETH20 is an EIP621, EIP610-compliant token backed by Ether. Call `etherToToken` to receive tokens equaling to the Ether transferred in the message. Call `tokenToEther` after approving ETH20 to `transferFrom` to receive Ether equaling the provided token `_amount`.

## Install

`npm i && npm run compile`

## Test

`npm run test`

## Deploy

Deploying to a network other than the testRPC requires a `secrets.json` file with a mnemonic whose account on the `m/44'/60'/0'/0` path is funded with Ether for the network being deployed to.

The `secrets.json` file should be in the following form:
```
{
  "mnemonic": "my very good mnemonic"
}
```

Rinkeby: `npm run deploy-rinkeby`

