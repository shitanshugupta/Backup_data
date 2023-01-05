import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SignerService {
    private _signerAddress = new BehaviorSubject({});
    constructor() { }
    getsignerAddresss(){
      return this._signerAddress.asObservable();
    }
    putDataToStream(data:any){
      this._signerAddress.next(data);
    }
}