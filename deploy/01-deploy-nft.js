const { network, ethers } = require("hardhat");
const { developmentChains, networkConfig } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
const fs = require("fs");
const { storeImages, storeTokenUriMetadata } = require("../utils/uploadToPinata");
const { makeMetadata } = require("../utils/helpers");

const metadataTemplate = makeMetadata({});
console.log("MD:", metadataTemplate);

const imagesLocation = "./images";

let tokenUris = [];

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const chainId = network.config.chainId;

    // get the IPFS hashes of our images
    if (process.env.UPLOAD_TO_PINATA === "true") {
        tokenUris = await handleTokenUris();
        console.log("TOKEN URIS:", tokenUris);
    }

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

async function handleTokenUris() {
    tokenUris = [];
    // store the image in IPFS
    // store the metadata in IPFS
    const { responses: imageUploadResponses, files } = await storeImages(imagesLocation);

    for (let index in imageUploadResponses) {
        // create metadata, then upload it
        let tokenUriMetadata = { ...metadataTemplate };
        tokenUriMetadata.name = files[index].replace(".svg", "");
        tokenUriMetadata.description = `Test image of a ${tokenUriMetadata.name}`;
        tokenUriMetadata.image = `ipfs://${imageUploadResponses[index].IpfsHash}`;

        console.log(`Uploading ${tokenUriMetadata.name}...`);

        const metadataUploadResponse = await storeTokenUriMetadata(tokenUriMetadata);
        tokenUris.push(`ipfs://${metadataUploadResponse.IpfsHash}`);
    }
    console.log("Token URIs Uploaded!  They are:");
    console.log(tokenUris);

    return tokenUris;
}

module.exports.tags = ["all", "main"];
