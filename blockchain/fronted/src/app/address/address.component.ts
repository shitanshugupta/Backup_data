import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  public data;

  constructor(_dataService: ServiceService,private router:Router) {
    this.data = _dataService.getOption();
  }
  ngOnInit(): void {
  }
  onSend(){
    this.router.navigate(['./wallet/send']);
  }
  onReceive(){
    this.router.navigate(['./wallet/receive']);
  }
}
