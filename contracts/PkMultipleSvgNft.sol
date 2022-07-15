// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "base64-sol/base64.sol";

contract PkMultipleSvgNft is ERC721 {
    uint256 private s_tokenCounter;
    string[4] internal s_tokenUris;
    // string internal s_blueTokenUri;
    // string internal s_greenTokenUri;
    // string internal s_redTokenUri;
    // string internal s_yellowTokenUri;
    string private constant base64EncodedSvgPrefix = "data:image/svg+xml;base64,";

    constructor(
        // string memory blueUri,
        // string memory greenUri,
        // string memory redUri,
        // string memory yellowUri
        string[4] memory tokenUris
    ) ERC721("PK MULTISVG", "PKS") {
        s_tokenCounter = 0;
        s_tokenUris = tokenUris;
        // s_blueTokenUri = svgToImageURI(blueUri);
        // s_greenTokenUri = svgToImageURI(greenUri);
        // s_redTokenUri = svgToImageURI(redUri);
        // s_yellowTokenUri = svgToImageURI(yellowUri);
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
        for (uint256 i = 0; i < 4; i++) {
            _safeMint(msg.sender, i);
            s_tokenCounter = s_tokenCounter + 1;
        }

        return s_tokenCounter;

        // _safeMint(msg.sender, s_tokenCounter);
        // s_tokenCounter = s_tokenCounter + 1;

        // return s_tokenCounter;
    }

    function tokenURI(uint256 tokenIdx) public view override returns (string memory) {
        // overrides the inherited tokenURI getter to return the contract's tokenURI
        string[4] memory names = ["PK Blue", "PK Green", "PK Red", "PK Yellow"];
        string[4] memory hexes = ["87ceeb", "3ae57f", "d12f50", "ffea00"];

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
                                names[tokenIdx],
                                // 'PK Red'
                                // name(),
                                '", "description":"Testing SVG NFT Contracts", ',
                                // '"attributes": [{"trait_type": "bgColorHex", "value": "d12f50"}], "image":"',
                                '"attributes": [{"trait_type": "bgColorHex", "value": "',
                                hexes[tokenIdx],
                                ' "}], "image":"',
                                // s_tokenUri was already prefixed with base64EncodedSvgPrefix in constructor
                                svgToImageURI(s_tokenUris[tokenIdx]),
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
