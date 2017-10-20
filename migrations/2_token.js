/* global artifacts */

const ETH20 = artifacts.require('./ETH20.sol');

module.exports = deployer => deployer.deploy(ETH20, '0', 'ETH20', '18', 'E20');

