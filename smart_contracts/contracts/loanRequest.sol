// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract loanRequest {
    enum LoanStatus {UNINITIATED, UNPAID, PAID}
    
    ERC721 public collateralNFT;
    uint256 requestAmount;
    uint256 interestAmount;
    uint256 requesterId;
    uint256 lenderId;
    uint256 loanDuration;
    uint256 bidDuration;
    uint256 bidStart;
    uint256 loanStart;
    LoanStatus returned;


    struct Collateral {
        uint256 tokenId; 
        uint256 timestamp; 
    }

    mapping(address => Collateral) public collateral;

    
    constructor(uint256 _requestAmount, uint256 collateralTokenId, uint256 _bidDuration, uint256 _loanDuration) {
        collateralNFT = ERC721(0);
        requestAmount = _requestAmount;
        requesterId = msg.sender;
        interestAmount = _requestAmount;
        lenderId = 0;
        returned = -1;
        bidDuration = _bidDuration;
        loanDuration = _loanDuration;
        stake(collateralTokenId);
    }

    function stake(uint256 _tokenId) private {
        collateral[msg.sender] = Collateral(_tokenId, block.timestamp);
        collateralNFT.safeTransferFrom(msg.sender, address(this), _tokenId, _amount, "0x00");
    }

    function bid(uint256 _bidderId, uint256 _interestAmount) public {
        if(block.time-bidStart < bidDuration && _interestAmount < interestAmount){
            lenderId = _bidderId;
            interestAmount = _interestAmount;
            return true;
        }
        return false;
    }

    function unstake() public {
        if(msg.sender == requesterId || (msg.sender == lenderId && block.timestamp-loanStart >= loanDuration)){
            if(returned == LoanStatus.UNITIATED || returned == LoanStatus.PAID)
                collateralNFT.safeTransferFrom(address(this), requesterId, collateral[msg.sender].tokenId, "Ox00");
            else
                collateralNFT.safeTransferFrom(address(this), lenderId, collateral[msg.sender].tokenId, "0x00");
        delete stakes[msg.sender];
        }
    }

    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        bytes calldata data
    ) external returns (bytes4) {
        return bytes4(keccak256("onERC1155Received(address,address,uint256,bytes)"));
    }
}