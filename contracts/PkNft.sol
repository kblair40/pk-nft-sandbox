// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "base64-sol/base64.sol";

contract PkNft is ERC721 {
    uint256 private s_tokenCounter;

    // NFT Variables
    // string public constant TOKEN_URI =
    //     "ipfs://QmeMrWk8kxU7dbdqyKJziLhzJhgm9GWLjnShTr7Tzo1g77/?filename=pklogo.svg";
    string internal s_tokenUri;
    string private constant base64EncodedSvgPrefix = "data:image/svg+xml;base64,";

    constructor(string memory imageUri) ERC721("PK Logo NFT", "PKL") {
        s_tokenCounter = 0;
        s_tokenUri = svgToImageURI(imageUri);
    }

    function svgToImageURI(string memory svg) public pure returns (string memory) {
        // example:
        // '<svg width="500" height="500" viewBox="0 0 285 350" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="black" d="M150,0,L75,200,L225,200,Z"></path></svg>'
        // would return ""
        string memory svgBase64Encoded = Base64.encode(bytes(string(abi.encodePacked(svg))));
        return string(abi.encodePacked(base64EncodedSvgPrefix, svgBase64Encoded));
    }

    function mintNft() public returns (uint256) {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;

        return s_tokenCounter;
    }

    function tokenURI(uint256) public view override returns (string memory) {
        // overrides the inherited tokenURI getter to return the contract's tokenURI
        // return TOKEN_URI;
        return s_tokenUri;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
