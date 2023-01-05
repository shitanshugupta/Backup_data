import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { SignerService } from 'src/app/services/signer.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  variab: any
  address: any
  localContract: any
  data: any = []
  nftObj: any = {}
  constructor(private signerAddress: SignerService) {
    const signer = this.signerAddress.getsignerAddresss()
    signer.subscribe({
      next: (address: any) => {
        this.address = address.signer
        this.localContract = address.localContract
      }
    })
    this.variab = this.explore()
    console.log(this.variab)

  }
  // owner
  // : 
  // "0xbeeE3C0c649ebC5623525DD6A4c379755cD207D6"
  // price
  // : 
  // BigNumber {_hex: '0x01', _isBigNumber: true}
  // seller
  // : 
  // "0x5D1560C6E0d5b5130E4f117EFAcDF59c61cD74b2"
  // sold
  // : 
  // false
  // tokenId
  // : 
  // BigNumber {_hex: '0x01', _isBigNumber: true}

  testAuthentication = async (uri: any) => {

    const url = `https://ipfs.io/ipfs/${uri}`;
    try {
      const response = await axios.get(url, {
          headers: {
            'pinata_api_key': '405cd03c1a778936fc24',
            'pinata_secret_api_key': 'e1f9b206b09f0b951ed0881139beadde2536fbc8efa0b234751db866053823dc',
            'Access-Control-Allow-Origin': "X-PINGOTHER, Content-Type",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",

            'Content-Type': 'application/x-www-form-urlencoded',
          }
        });
      console.log('------>', response);

    } catch (error) {
      console.log(error);
    }
  };

  async explore() {
    const allMarketItems = await this.localContract.fetchMarketItems();
    console.log(allMarketItems.length)
    for (let i = 0; i < allMarketItems.length; i++) {
      this.nftObj.address = allMarketItems[i].seller
      this.nftObj.price = (allMarketItems[i].price).toNumber()
      this.nftObj.uri = await this.localContract.tokenURI((allMarketItems[i].tokenId).toNumber())
      this.testAuthentication(this.nftObj.uri)
      this.data.push(this.nftObj)
      this.nftObj = {}
    }
    console.log(this.data)
    return allMarketItems
  }
  ngOnInit(): void {
    // this.variab = this.explore()
  }
  // data:any = [
  //   {
  //     imagepath:'https://imgd-ct.aeplcdn.com/370x208/n/cw/ec/40432/scorpio-n-exterior-right-front-three-quarter-15.jpeg?isig=0&q=75',
  //     name:'ljflsdj',
  //     price:'jlfadjfla',
  //     address:'jlajfl'
  //   },
  //   {
  //     imagepath:'https://imgd-ct.aeplcdn.com/370x208/n/cw/ec/40432/scorpio-n-exterior-right-front-three-quarter-15.jpeg?isig=0&q=75',
  //     name:'ljflsdj',
  //     price:'jlfadjfla',
  //     address:'jlajfl'
  //   },
  //   {
  //     imagepath:'https://imgd-ct.aeplcdn.com/370x208/n/cw/ec/40432/scorpio-n-exterior-right-front-three-quarter-15.jpeg?isig=0&q=75',
  //     name:'ljflsdj',
  //     price:'jlfadjfla',
  //     address:'jlajfl'
  //   },
  //   {
  //     imagepath:'https://imgd-ct.aeplcdn.com/370x208/n/cw/ec/40432/scorpio-n-exterior-right-front-three-quarter-15.jpeg?isig=0&q=75',
  //     name:'ljflsdj',
  //     price:'jlfadjfla',
  //     address:'jlajfl'
  //   },
  // ]
}