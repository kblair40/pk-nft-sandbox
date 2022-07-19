const { ethers, network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config.js");
const { verify } = require("../utils/verify");
// const { moveBlocks } = require("../utils/move-blocks");

async function mintNft() {
    // const pkSvgNft = await ethers.getContract("PkSvgNft");
    const basicSvgNft = await ethers.getContract("BasicSvgNft");
    console.log("\nMinting...");

    // mint a basicSvgNft
    const mintTx = await basicSvgNft.mintNft();
    const mintTxReceipt = await mintTx.wait(1);
    console.log("Minted!\n");

    // this works because we emit the tokenId in the DogMinted event in the contract
    const tokenId = mintTxReceipt.events[0].args.tokenId;
    console.log("ID OF MINTED TOKEN:", tokenId);

    // console.log("Approving Nft...");

    // const approvalTx = await basicSvgNft.approve(nftMarketplace.address, tokenId);
    // await approvalTx.wait(1);
    // console.log("Listing NFT...");
    // const tx = await nftMarketplace.listItem(basicNft.address, tokenId, PRICE);
    // await tx.wait(1);
    // console.log("Listed!");

    if (network.config.chainId == "31337") {
        // Moralis has a hard time if you move more than 1 at once!
        // Mining 1 block gives moralis time to index our event
        // await moveBlocks(2, (sleepAmount = 1000));
        console.log('chainId == "31337"');
    }
}

// When this is run, Moralis should notice a new nft was minted and listed (ListItem event) and update the database

mintNft()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error("Error:", e);
        process.exit(1);
    });
