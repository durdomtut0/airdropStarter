// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTStaking {
    IERC721 public nftAddress;
    IERC20 public tokenAddress;

    struct StakedToken {
        address staker;
        uint256 tokenId;
    }

    struct StakedTokens {
        uint256 amountStaked;
        StakedToken[] tokenIdsStaked;
        uint256 timeLastUpdated;
        uint256 claimableRewards;
    }

    mapping(uint256 => address) public stakerAddress;
    mapping(address => StakedTokens) public addressData;

    constructor(IERC721 _nftAddress, IERC20 _tokenAddress) {
        nftAddress = _nftAddress;
        tokenAddress = _tokenAddress;
    }

    function stake(uint256 _tokenId) public {
        //nftAddress.setApprovalForAll(address(this), true);

        require(
            msg.sender == nftAddress.ownerOf(_tokenId),
            "You are not owner of the token"
        );
        nftAddress.transferFrom(msg.sender, address(this), _tokenId);

        //StakedTokens stakedTokens =

        stakerAddress[_tokenId] = msg.sender;

        addressData[msg.sender].amountStaked++;
        //StakedToken memory stakedToken = StakedToken(msg.sender, _tokenId);
        addressData[msg.sender].tokenIdsStaked.push(
            StakedToken(msg.sender, _tokenId)
        );
        addressData[msg.sender].timeLastUpdated = block.timestamp;
    }

    function withdraw(uint256 _tokenId) public {
        require(
            msg.sender == stakerAddress[_tokenId],
            "Token you are withdrawing is not staked"
        );

        nftAddress.transferFrom(address(this), msg.sender, _tokenId);

        stakerAddress[_tokenId] = address(0);

        // Find the index of this token id in the stakedTokens array
        uint256 index = 0;
        for (
            uint256 i = 0;
            i < addressData[msg.sender].tokenIdsStaked.length;
            i++
        ) {
            if (
                addressData[msg.sender].tokenIdsStaked[i].tokenId == _tokenId &&
                addressData[msg.sender].tokenIdsStaked[i].staker != address(0)
            ) {
                index = i;
                break;
            }
        }
        addressData[msg.sender].amountStaked--;
        addressData[msg.sender].tokenIdsStaked[index].staker = address(0);
        addressData[msg.sender].timeLastUpdated = block.timestamp;
    }
}
