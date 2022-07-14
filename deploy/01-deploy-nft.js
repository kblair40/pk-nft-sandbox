const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
const fs = require("fs");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const svg = await fs.readFileSync("./images/pklogo.svg", {
        encoding: "utf8",
    });
    args = [svg];
    const pkNft = await deploy("PkNft", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });

    log("---------------------------------------");
    console.log("Deployed to...", pkNft.address);

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(pkNft.address, args);
    }
};

module.exports.tags = ["all", "main"];
