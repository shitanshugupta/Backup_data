import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private data:any = {};  
  private transfer:any={}
  
  setOption(option:any, value:any) {  
    this.data[option] = value;  
  }  
  
  getOption() {  
    return this.data;
  }  
  setdata(key:any,details:any){
    this.transfer[key]=details
  }
  getdata(){
    return this.transfer
  }
  constructor() { }
}
