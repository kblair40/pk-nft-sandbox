// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "base64-sol/base64.sol";

contract PkSvgNft is ERC721 {
    uint256 private s_tokenCounter;
    string internal s_tokenUri;
    string private constant base64EncodedSvgPrefix = "data:image/svg+xml;base64,";

    constructor(string memory imageUri) ERC721("PK SVG", "PKS") {
        s_tokenCounter = 0;
        s_tokenUri = svgToImageURI(imageUri);
    }

    function svgToImageURI(string memory svg) public pure returns (string memory) {
        string memory svgBase64Encoded = Base64.encode(bytes(string(abi.encodePacked(svg))));

        // concatenate base64EncodedSvgPrefix with svgBase64Encoded
        return string(abi.encodePacked(base64EncodedSvgPrefix, svgBase64Encoded));
    }

    // Must override this function when minting
    function _baseURI() internal pure override returns (string memory) {
        // data:application/json;base64, is prefix for base64 json
        return "data:application/json;base64,";
    }

    function mintNft() public returns (uint256) {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;

        return s_tokenCounter;
    }

    function tokenURI(uint256) public view override returns (string memory) {
        // overrides the inherited tokenURI getter to return the contract's tokenURI
        return
            string(
                abi.encodePacked(
                    // concatenate baseURI with the Base64 encoding
                    _baseURI(),
                    // typecase to bytes so the json can be Base64 encoded
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name": "',
                                'PK Red'
                                // name(),
                                '", "description":"Testing SVG NFT Contracts", ',
                                '"attributes": [{"trait_type": "bgColorHex", "value": "d12f50"}], "image":"',
                                // s_tokenUri was already prefixed with base64EncodedSvgPrefix in constructor
                                s_tokenUri,
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}