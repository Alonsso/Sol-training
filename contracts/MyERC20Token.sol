// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC20Token is ERC20 {
    uint256 public maxTokensPerMint = 100;

    mapping(address => bool) public hasMinted;

    address public stackingAddress;

    constructor(address _stackingAddress) ERC20("MyERC20Token", "MET") {
        stackingAddress = _stackingAddress;
    }

    function mint(address to, uint256 amount) public {
        if (msg.sender == stackingAddress) {
            _mint(to, amount);
        } else {
            require(amount <= maxTokensPerMint, "max amount exceed");
            require(hasMinted[to] == false, "has minted");
            _mint(to, amount);
            hasMinted[to] = true;
        }
    }
}
