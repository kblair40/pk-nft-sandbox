const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts }) => {
    // deployer will be used for minting
    const { deployer } = await getNamedAccounts();

    const pkNft = await ethers.getContract("PkNft", deployer);
    const pkMintTx = await pkNft.mintNft();
    await pkMintTx.wait(1);
    console.log(`PK NFT index 0 tokenURI: ${await pkNft.tokenURI(0)}`);
};

module.exports.tags = ["all", "mint"];
