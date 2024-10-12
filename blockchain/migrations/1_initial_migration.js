// blockchain-investment-platform/blockchain/migrations/1_initial_migration.js

const InvestmentPlatform = artifacts.require("InvestmentPlatform");

module.exports = function(deployer) {
  deployer.deploy(InvestmentPlatform);
};