import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNftComponent } from './create/create-nft/create-nft.component';
import { ExploreComponent } from './explore/explore/explore.component';
import { ListedNftsComponent } from './listedNfts/listed-nfts/listed-nfts.component';
import { MyNftsComponent } from './myNfts/my-nfts/my-nfts.component';

const routes: Routes = [
  { path: 'create', component: CreateNftComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'my-nfts', component: MyNftsComponent },
  { path: 'listed-nfts', component: ListedNftsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
