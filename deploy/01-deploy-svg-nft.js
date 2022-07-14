const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
const fs = require("fs");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    // for SVG images, this is best practice for reading/encoding.
    // Other images ex. png, jpg etc. are better to pin to IPFS and then use the IPFS url
    const svg = await fs.readFileSync("./images/pklogo.svg", {
        encoding: "utf8",
    });

    args = [svg];
    const pkSvgNft = await deploy("PkSvgNft", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });

    log("---------------------------------------");
    console.log("Deployed to...", pkSvgNft.address);

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(pkSvgNft.address, args);
    }
};

module.exports.tags = ["all", "svg", "main"];

// // New version where multiple svgs are sent at the same time
// orts = async ({ getNamedAccounts, deployments }) => {
//     const { deploy, log } = deployments;
//     const { deployer } = await getNamedAccounts();

//     const SVGs = [];
//     const colors = ["blue", "green", "red", "yellow"];
//     for (let color of colors) {
//         const svg = await fs.readFileSync(`./images/pklogo${color}.svg`, {
//             encoding: "utf8",
//         });
//         SVGs.push(svg);
//     }

//     args = [SVGs];
//     const pkSvgNft = await deploy("PkSvgNft", {
//         from: deployer,
//         args: args,
//         log: true,
//         waitConfirmations: network.config.blockConfirmations || 1,
//     });

//     // End New Version

//     log("---------------------------------------");
//     console.log("Deployed to...", pkSvgNft.address);

//     // Verify the deployment
//     if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
//         log("Verifying...");
//         await verify(pkSvgNft.address, args);
//     }
// };

// module.exports.tags = ["all", "svg", "main"];
