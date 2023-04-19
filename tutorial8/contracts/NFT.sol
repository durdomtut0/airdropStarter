// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFT is ERC721Enumerable {
    using Strings for uint256;

    uint256 currentId;

    constructor() ERC721("LearnNFT", "LNFT") {}

    function _baseURI() internal view virtual override returns (string memory) {
        return "ipfs://QmYpyqM7q7fw2vAy87e4Gyag1QnbX9AmQmcmwsmq9Wu2Ji/";
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json"))
                : "";
    }

    function mint() public {
        _safeMint(msg.sender, currentId++);
    }
}
