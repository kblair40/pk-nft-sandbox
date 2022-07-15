const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
const fs = require("fs");

// New version where multiple svgs are sent at the same time
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const SVGs = [];
    const colors = ["blue", "green", "red", "yellow"];

    for (let color of colors) {
        const svg = await fs.readFileSync(`./images/pklogo${color}.svg`, {
            encoding: "utf8",
        });
        SVGs.push(svg);
    }

    // console.log("ALL SVGS:", SVGs);

    args = [SVGs];
    const pkMultipleSvgNft = await deploy("PkMultipleSvgNft", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });

    log("---------------------------------------");
    console.log("Deployed to...", pkMultipleSvgNft.address);
    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(pkMultipleSvgNft.address, args);
    }
};

module.exports.tags = ["all", "multi", "main"];

// const tokenUris = [
//     "ipfs://QmV8rQ6hftaAsTRTNWWXWXh7rU9jSnBfuxWwDJEV9MCmBf", // blue
//     "ipfs://QmbLGbc78mBFacjePNUsVDGDYGvBaArvgKddk3SVXwnniY", // green
//     "ipfs://QmeMrWk8kxU7dbdqyKJziLhzJhgm9GWLjnShTr7Tzo1g77", // red
//     "ipfs://Qmc8XEuXp8L3Q69KPnztvyQSYuVp6GXsKzDZWBNS565RtA", // yellow
// ];
