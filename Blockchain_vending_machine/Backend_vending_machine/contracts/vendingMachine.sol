// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract vendingMachine{
    address public owner;
    mapping(address => uint) public donutBalances;

    constructor(){
        owner=msg.sender;
        donutBalances[address(this)]=100;       // contract address
    }
    function getVendingMachineBalacnce() public view returns(uint){
        return donutBalances[address(this)];
    }
    function addStock(uint amount)public{
        // only owner can add 
        require(msg.sender==owner,"only owner can add stock");
        donutBalances[address(this)]+=amount;
    }
    function purchaseDonut(uint amount)public payable{// payable is used to receive the ethers in the function
        require(donutBalances[address(this)]>=amount,"not enough donut to purchase");// checking is sufficient amount of donut s present in machine
        require(msg.value>=amount*0.00002 ether,"you must atleast 2 ether per donut");// using msg.value the ether received by the purchaser
        donutBalances[address(this)]-=amount;
        donutBalances[msg.sender]+=amount;// purchaser address using msg.sender to add donut to purchaser

    }
}  
