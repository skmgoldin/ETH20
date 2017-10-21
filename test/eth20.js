/* eslint-env mocha */
/* global contract artifacts assert */

const ETH20 = artifacts.require('./ETH20.sol');
const Token = artifacts.require('./tokens/EIP621OraclizedToken.sol');

const BN = require('bignumber.js');
const HttpProvider = require('ethjs-provider-http');
const Eth = require('ethjs-query');

const eth = new Eth(new HttpProvider('http://localhost:7545'));

contract('ETH20', (accounts) => {
  describe('Function: etherToToken', () => {
    const [user] = accounts;

    it('should give the user ETH20 equaling the transferred Ether', async () => {
      const eth20 = await ETH20.deployed();
      const tokenAddr = await eth20.tokenAddress.call();
      const token = Token.at(tokenAddr);

      const userInitialETHBalance = new BN((await eth.getBalance(user)).toString(10), 10);
      const userInitialTokenBalance = await token.balanceOf.call(user);

      const receipt = await eth20.etherToToken({ value: '420' });
      const gasUsed = new BN(receipt.receipt.gasUsed, 10).mul(new BN('100000000000', 10));

      const userFinalETHBalance = new BN((await eth.getBalance(user)).toString(10), 10);
      const userFinalTokenBalance = await token.balanceOf.call(user);

      const expectedFinalETHBalance = userInitialETHBalance.sub(gasUsed).sub(new BN('420', 10));
      assert(userFinalETHBalance.eq(expectedFinalETHBalance));

      const expectedFinalTokenBalance = userInitialTokenBalance.add(new BN('420', 10));
      assert(userFinalTokenBalance.eq(expectedFinalTokenBalance));
    });
  });

  describe('Function: tokenToEther', () => {
    const [user] = accounts;

    it('should give the user Ether equaling the provided ETH20', async () => {
      const eth20 = await ETH20.deployed();
      const tokenAddr = await eth20.tokenAddress.call();
      const token = Token.at(tokenAddr);

      const userInitialETHBalance = new BN((await eth.getBalance(user)).toString(10), 10);
      const userInitialTokenBalance = await token.balanceOf.call(user);

      const approveReceipt = await token.approve(eth20.address, userInitialTokenBalance);
      const approveGasUsed =
        new BN(approveReceipt.receipt.gasUsed, 10).mul(new BN('100000000000', 10));
      const tokenToEtherReceipt = await eth20.tokenToEther(userInitialTokenBalance);
      const tokenToEtherGasUsed =
        new BN(tokenToEtherReceipt.receipt.gasUsed, 10).mul(new BN('100000000000', 10));

      const totalGasUsed = approveGasUsed.add(tokenToEtherGasUsed);

      const userFinalETHBalance = new BN((await eth.getBalance(user)).toString(10), 10);
      const userFinalTokenBalance = await token.balanceOf.call(user);

      const expectedFinalETHBalance = userInitialETHBalance.sub(totalGasUsed)
        .add(userInitialTokenBalance);
      assert(userFinalETHBalance.eq(expectedFinalETHBalance));

      const expectedFinalTokenBalance = userInitialTokenBalance
        .sub(new BN(userInitialTokenBalance, 10));
      assert(userFinalTokenBalance.eq(expectedFinalTokenBalance));
    });
  });
});

