const { network, ethers } = require("hardhat");
const { developmentChains, networkConfig } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
const fs = require("fs");
// const { storeImages, storeTokenUriMetadata } = require("../utils/uploadToPinata")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    // const chainId = network.config.chainId
    // let ethUsdPriceFeedAddress

    // if (developmentChains.includes(network.name)) {
    //     const EthUsdAggregator = await ethers.getContract("MockV3Aggregator")
    //     ethUsdPriceFeedAddress = EthUsdAggregator.address
    // } else {
    //     ethUsdPriceFeedAddress = networkConfig[chainId].ethUsdPriceFeed
    // }

    log("---------------------------------------");

    const svg = await fs.readFileSync("./images/pklogo.svg", {
        encoding: "utf8",
    });

    // args = [ethUsdPriceFeedAddress, lowSVG, highSVG]
    args = [svg];
    const pkNft = await deploy("PkNft", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });

    console.log("DEPLOY SUCCESS:", pkNft);
    console.log("Deployed to...", pkNft.address);

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(pkNft.address, args);
    }
};

// module.exports.tags = ["all", "dynamicvsg", "main"]
