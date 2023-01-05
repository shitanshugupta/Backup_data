import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Web3 from 'web3'
import walletJsonAbi from '../../../../Backend_vending_machine/build/contracts/vendingMachine.json'
import contract from "../../../../Backend_vending_machine/environment/deploy.json"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  errors = null
  success: any
  balance: any
  acc: any
  MyBalance: any
  web3: any
  provider: any
  abis: any
  contract_address: any
  vmContract: any
  purchase: string = '';
  restock: string = '';
  amount: any
  error: any
  title = 'vending_machine';

  // wallet connection
  onClick = async () => {
    this.errors = null
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        this.web3 = new Web3(window.ethereum)// metamak provides an etherium provider api to request accounts from metamask
        this.success = "Wallet connected Successfully"
      } catch (error: any) {
        this.errors = error.message;
      }
    } else {
      console.log('Create Wallet on MetaMask');
    }
  }
  async connect() {
    this.web3 = new Web3(window.ethereum)
    this.acc = await this.web3.eth.getAccounts()
    this.abis = walletJsonAbi.abi
    this.contract_address = contract.CONTRACT_ADDRESS
    this.vmContract = new this.web3.eth.Contract(this.abis, this.contract_address)
  }

  // vending machine balance
  onBalance = async () => {
    console.log("click");
    await this.connect();
    this.balance = await this.vmContract.methods.getVendingMachineBalacnce().call()
    console.log(this.balance);
    this.success = null;
  }
  // user balance
  onMyBalance = async () => {
    this.connect()
    this.acc = await this.web3.eth.getAccounts()
    console.log(this.acc);
    this.MyBalance = await this.vmContract.methods.donutBalances(this.acc[0]).call()
    console.log(this.MyBalance);
  }
// user purchasing 
  onPurchase = async (p: NgForm) => {
    this.amount = p.value.purchase * 1
    await this.connect()
    console.log(this.acc);
    await this.vmContract.methods.purchaseDonut(this.amount).send({
      from: this.acc[0],
      value: this.web3.utils.toWei('0.00002', 'ether') * this.amount
    })
  }
  onRestock = async (q: NgForm) => {
      this.amount = q.value.restock * 1
      console.log(this.amount);
      await this.connect();
      console.log(this.acc);
      this.acc = await this.web3.eth.getAccounts()
      await this.vmContract.methods.addStock(this.amount).send({
        from: this.acc[0]
      })
    
  }
  ngOnInit(): void {
    console.log(this.abis); 
    console.log(this.vmContract);
    console.log(this.web3);
    console.log(new Web3(window.ethereum), "line68");
    console.log("line 69");
    console.log(new Web3(this.provider), "line 70");
  }
}

//Question  window.ethereum and this.provider
// Answer MetaMask injects a global API into websites visited by its users 
//at window.ethereum (Also available at window.web3.currentProvider for legacy reasons). 
//This API allows websites to request user login, load data from blockchains the user has a connection to,
// and suggest the user sign messages and transactions. You can use this API to detect the user of a web3 browser.