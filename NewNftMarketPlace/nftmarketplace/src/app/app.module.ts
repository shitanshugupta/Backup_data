import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../app/header/header/header.component';
import { CreateNftComponent } from './create/create-nft/create-nft.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExploreComponent } from './explore/explore/explore.component';
import { MyNftsComponent } from './myNfts/my-nfts/my-nfts.component';
import { ListedNftsComponent } from './listedNfts/listed-nfts/listed-nfts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateNftComponent,
    ExploreComponent,
    MyNftsComponent,
    ListedNftsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
