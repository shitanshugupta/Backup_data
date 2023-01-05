import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.css']
})
export class ReceiveComponent implements OnInit {
public data
  constructor( public _dataService: ServiceService) {
    this.data = _dataService.getOption();

  }

  ngOnInit(): void {
  }

}
