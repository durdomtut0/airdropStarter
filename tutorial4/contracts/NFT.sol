// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFT is ERC721Enumerable, Ownable {
    using Strings for uint256;

    //1000 NFT done
    //pay ETH to mint NFT done
    //unique metadata for each NFT
    
    uint256 maxSupply = 1000;
    uint256 cost = 0.001 ether;
    string baseURI = "https://raw.githubusercontent.com/durdomtut0/NFT-metadata/main/metadata/";

    constructor() ERC721("Bunnies", "NFT") {}

    //ON-CHAIN DATA
    //EVENT 

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);
        //string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) : "";
    }

    function changeBaseURI(string memory _newBaseURI) onlyOwner public{
        baseURI = _newBaseURI;
    }

    function safeMint(address _to) public payable {
        uint256 _currentSupply  = totalSupply();
        require(_currentSupply < maxSupply, "You reached max supply");
        require(msg.value == cost, "Please add valid amount of ETH");

        _safeMint(_to, _currentSupply);

    } 

    function withdraw() public onlyOwner{
        //
        //payable(msg.sender).transfer(address(this).balance);
        //(bool os, ) = payable(owner()).call{value: address(this).balance}(""); require(os);
        
        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(success);
   
    }


}