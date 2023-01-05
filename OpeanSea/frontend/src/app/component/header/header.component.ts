import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Web3 from 'web3'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
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
  title = 'frontend';
  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  onWallet = async () => {
    this.errors = null
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        this.web3 = new Web3(window.ethereum)// metamak provides an etherium provider api to request accounts from metamask
        this.success = "Wallet connected Successfully"
        alert(this.success)
      } catch (error: any) {
        this.errors = error.message;
        alert('Create Wallet on MetaMask')
      }
    } else {
      console.log('Create Wallet on MetaMask');
      alert('Create Wallet on MetaMask')
    }
  }
  onCreate(){
    this.route.navigate(['./createForm'])
  }
  // condition:boolean=false;
  // onchange(){
  //   this.condition=true;
  // }
}
