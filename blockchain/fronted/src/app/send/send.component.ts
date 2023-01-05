import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ethers, Wallet } from 'ethers';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']

})
export class SendComponent implements OnInit {
  checkoutForm = this.formBuilder.group({
    To: '',
    Amount: '',
    GasP: ''
  });
  constructor(private formBuilder: FormBuilder, public _dataService: ServiceService, private router: Router) {

  }
  ngOnInit(): void {
  }
  onSubmit(): void {
    const { To, Amount, GasP } = this.checkoutForm.value
    this._dataService.setdata('To', To);
    this._dataService.setdata('Amount', Amount);
    this._dataService.setdata('GasP', GasP);
    this.checkoutForm.reset(); 

    this.router.navigate(['/wallet',"send","receipt"]);
  }
}
// "0x36458BD5Fa20389fa2A215A51555f962923e5125"