declare let window: any;
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ethers } from 'ethers';
import { SignerService } from 'src/app/services/signer.service';
const contractAddress = require('../../../../environment/contract-address.json');
const abi = require('../../../../blockchain/artifacts/blockchain/contract/NFTMarketplace.sol/NFTMarketplace.json');

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  selection: any;
  public signer: any;
  constructor(private router: Router, private signerAddress: SignerService) { }
  ngOnInit(): void {

  }
  async onConnect() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send('eth_requestAccounts', []);

    provider.on("network", (newNetwork: any, oldNetwork: any) => {
      if (oldNetwork) {
        window.location.reload();
      }
    });

    this.signer = provider.getSigner();
    const NFTMarketplace = new ethers.Contract(contractAddress.nftMarketplace, abi.abi, this.signer);
    console.log(await NFTMarketplace.getListingPrice(), NFTMarketplace)
    this.signerAddress.putDataToStream({ signer: await this.signer.getAddress(), localContract: NFTMarketplace})

    if (await this.signer.getChainId() !== 5) {
      alert("Please Change your network to goerli testnet!")
    } else {
      this.condition = true
    }
  }
  onCreate() {

    this.router.navigate(["./create"]);
  }
  onExplore(){
    
    this.router.navigate(["./explore"]);
  }

  onMyNfts(){
    this.router.navigate(['./my-nfts'])
  }

  onListedNfts(){
    this.router.navigate(['./listed-nfts'])
  }
  condition: boolean = false
  onchage() {
    this.condition = true
  }

}
