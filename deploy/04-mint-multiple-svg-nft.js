const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts }) => {
    // deployer will be used for minting
    const { deployer } = await getNamedAccounts();

    const pkMultipleSvgNft = await ethers.getContract("PkMultipleSvgNft", deployer);
    const pkMintTx = await pkMultipleSvgNft.mintNft();
    await pkMintTx.wait(1);
    console.log(`PK Multiple SVG NFT index 0 tokenURI: ${await pkMultipleSvgNft.tokenURI(0)}`);
};

module.exports.tags = ["all", "mintmulti"];
