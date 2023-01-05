//contracts/faucet.sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

// function signature of erc20 and needs to be implement in contract
interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool); // external to be accessed from other contract

    function balanceOf(address account) external view returns (uint256);
}

contract Faucet {
    address payable public owner;
    uint256 public withdrawAmount = 50 * (10**18);
    mapping(address => uint256) accesstime;
    uint256 public locktime = 1 minutes;
    IERC20 public token; //State variable of type IERC20 to hold instance of token so that it can access function
    event deposit(address from, uint256 amount);

    constructor(address addresstoken) payable {
        token = IERC20(addresstoken);// same name as interface 
        owner = payable(msg.sender);
    }

    function requestToken() public {
        require(msg.sender != address(0), "Invalid Request from zero Account");
        require(
            token.balanceOf(address(this)) >= withdrawAmount,
            "Insufficient balance in faucet balance"
        );
        require(
            block.timestamp >= accesstime[msg.sender],
            "Time elapsed please try after some time"
        );
        accesstime[msg.sender] = block.timestamp + locktime;
        token.transfer(msg.sender, withdrawAmount);
    }

    receive() external payable {
        emit deposit(msg.sender, msg.value);
    }

    function withdraw() external onlyowner {
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    // to get balance
    function getBalance() external view returns (uint256) {
        return (token.balanceOf(address(this)));
    }

    // set lock time
    function setLockTime(uint256 time) public onlyowner {
        locktime = time * 1 minutes;
    }

    // set withdraw ammount
    function setWithdrawAmount(uint256 amount) public onlyowner {
        withdrawAmount = amount * (10**18);
    }

    modifier onlyowner() {
        require(
            msg.sender == owner,
            "only owner can set the limit of withdrawal"
        );
        _;
    }
}

// addresstoken is the deployed address of the smart contract as when we deploy our file mycrypttoken.sol we got the address of the smart contract and that contract make use of the irc20 method so we have to create a local instance with the name token so that we can access the method of the cntract that inherits the methods of the erc20
