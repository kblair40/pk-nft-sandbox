const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts }) => {
    // deployer will be used for minting
    const { deployer } = await getNamedAccounts();

    const pkSvgNft = await ethers.getContract("PkSvgNft", deployer);
    const pkMintTx = await pkSvgNft.mintNft();
    await pkMintTx.wait(1);
    console.log(`PK SVG NFT index 0 tokenURI: ${await pkSvgNft.tokenURI(0)}`);
};

module.exports.tags = ["all", "mint"];
