// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PkPngNft is ERC721 {
    uint256 private s_tokenCounter;
    string internal s_tokenUri;

    constructor() ERC721("PK PNG NFT", "PKPN") {
        s_tokenCounter = 0;
        // s_tokenUri = tokenUri;
    }

    function mintNft() public returns (uint256) {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;

        return s_tokenCounter;
    }

    function tokenURI(uint256) public view override returns (string memory) {
        // overrides the inherited tokenURI getter to return the contract's tokenUri provided to the constructor
        return s_tokenUri;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
