const { ethers } = require("hardhat");

async function mintNft() {
    const basicSvgNft = await ethers.getContract("BasicSvgNft");
    console.log("\nMinting...");

    // mint a basicSvgNft
    const mintTx = await basicSvgNft.mintNft();
    const mintTxReceipt = await mintTx.wait(1);
    console.log("Minted!");
    console.log("RECEIPT:", mintTxReceipt);

    // this works because the tokenId is emitted in the PkSvgMinted event in the contract
    const tokenId = mintTxReceipt.events[0].args.tokenId;
    console.log("ID OF MINTED TOKEN:", tokenId.toString());
}

// When this is run, Moralis should notice a new nft was minted and listed (ListItem event) and update the database

mintNft()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error("Error:", e);
        process.exit(1);
    });
