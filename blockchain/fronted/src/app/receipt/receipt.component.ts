import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import * as $ from "jquery";
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],

})
export class ReceiptComponent implements OnInit {
  public data;
  wallet: any
  provider: any
  network: any
  result: any
  recei: any
  textedJson:any
  constructor(private formBuilder: FormBuilder, public _dataService: ServiceService, private router: Router) {
    this.result = _dataService.getdata()
    this.data = _dataService.getOption()
    this.network = 'ropsten'
    this.provider = ethers.getDefaultProvider(this.network);
    this.wallet = new ethers.Wallet(this.data.private, this.provider)

  }
  ngOnInit(): void {
    const { To, Amount, GasP } = this.result
    let transaction = {
      // nonce: 48,
      gasLimit: 21000,
      gasPrice: ethers.utils.parseUnits(GasP),
      to: To,
      value: ethers.utils.parseEther(Amount),
      // chainId:provider.utils.getNetwork(network).chainId
    }
    this.wallet.sendTransaction(transaction).then(async (receip: any) => {
      this.recei = await receip.wait();
      console.log(this.recei);
      this.textedJson = JSON.stringify(this.recei, undefined, 4);
      $('#myTextarea').text(this.textedJson);
    })
  }

}

