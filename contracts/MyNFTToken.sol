// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyNFTToken is ERC721 {

    ERC20 private _myToken;
    uint private _price = 100;

    constructor(address token) ERC721("MyNFTToken", "MNT") {
        _myToken = ERC20(token);
    }

    function safeMint(address to, uint256 tokenId) public {
        _myToken.transferFrom(msg.sender, address(this), _price);
        _safeMint(to, tokenId);
    }
}