// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NoteNFT is ERC721Enumerable {
    using Strings for uint256;
    //we can set Note in a blockchain and get NFT that represents our Note;
    uint8 public count = 0;
    uint32 public totalNotes = 10;
    event NoteNFTCreated(address, string);

    mapping(uint256 => string) noteInToken;

    constructor() ERC721("Note", "NT") {}

    function _baseURI() internal view virtual override returns (string memory) {
        return "User note: ";
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length > 0
                ? string(
                    abi.encodePacked(
                        baseURI,
                        noteInToken[tokenId],
                        ", token id:",
                        tokenId.toString()
                    )
                )
                : "";
    }

    function setNote(string memory _note) public {
        require(count < totalNotes, "Max notes reached");
        noteInToken[count] = _note;
        _safeMint(msg.sender, count++);
        emit NoteNFTCreated(msg.sender, _note);
    }

    function getNote(uint256 _tokenId) public view returns (string memory) {
        return tokenURI(_tokenId);
    }
}
