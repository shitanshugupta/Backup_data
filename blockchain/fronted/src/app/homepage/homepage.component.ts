import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ethers } from 'ethers';
import { ServiceService } from '../service.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {

  constructor(public _dataService: ServiceService,private router:Router) {
    let privateKey = '1853bf4a82934e8cc121f1664030114edf751a3c0eb367449773b293aa20a241'
    const network = 'ropsten'
    let provider = ethers.getDefaultProvider(network);
    let wallet = new ethers.Wallet(privateKey, provider);
    _dataService.setOption('wallet', wallet);
    _dataService.setOption('private',privateKey);
  }
  ngOnInit(): void {
  }

  onClick() { 
    this.router.navigate(['wallet']);
  }

} 
