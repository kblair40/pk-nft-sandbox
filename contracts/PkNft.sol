// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PkNft {
    // NFT Variables
    string public constant TOKEN_URI =
        "ipfs://QmeMrWk8kxU7dbdqyKJziLhzJhgm9GWLjnShTr7Tzo1g77/?filename=pklogo.svg";

    // Once this is working, make it reusable.
    // allow constructor to receive imageUri instead of hardcoding
    constructor() ERC721("PK Logo NFT", "PKL") {}

    function mintNft() public returns (uint256) {
        _safeMint(msg.sender, s_tokenCounter);
    }

    function tokenURI(uint256) public view override returns (string memory) {
        return TOKEN_URI;
    }
}
