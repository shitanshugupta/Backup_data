import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { ReceiveComponent } from './receive/receive.component';
import { SendComponent } from './send/send.component';

const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'wallet',component:AddressComponent},
  {path:'wallet/send',component:SendComponent},
  {path:'wallet/receive',component:ReceiveComponent},
  {path:'wallet/send/receipt',component:ReceiptComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
