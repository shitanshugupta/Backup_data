//contracts/myCryptCoin.sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

// ERC20Capped inherits the ERC20 therefore it is used heere.
contract MatiCoin is ERC20Capped, ERC20Burnable {
    address payable public owner;
    uint256 public _initialSupply = 7000 * (10**decimals());
    uint256 public blockReward;

    // this_totalsupply is the capped token means total value initial is reserved for owner and rest for the purpose of block reward
    constructor(uint256 _totalSupply)
        ERC20("MatiCoin", "MTC")
        ERC20Capped(_totalSupply * (10**decimals()))
    {
        owner = payable(msg.sender);
        _mint(owner, _initialSupply); // mint function in erc20 to asign the tinitial supply of tokn to the owner who deploy the contract
    }
    function _mint(address account, uint256 amount) internal virtual override (ERC20Capped,ERC20) 
    {
    require(ERC20.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");
    super._mint(account, amount);
    }//this code taken from node module open zepllin

    function _beforeTokenTransfer(address from, address to, uint256 value)internal virtual override{
        if(from!=address(0) && block.coinbase!=address(0)&& to!=block.coinbase)
        {
        _mintBlockReward();
        }
        super._beforeTokenTransfer(from,to,value);
    }

    function _mintBlockReward()internal{
        _mint(block.coinbase,blockReward);  // block is global variable and it provide the address of node who mint the block
    }

    function setBlockReward(uint256 reward) public onlyOwner {
        blockReward = reward * (10**decimals());
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only the owner can give reward");
        _;
    }
}
