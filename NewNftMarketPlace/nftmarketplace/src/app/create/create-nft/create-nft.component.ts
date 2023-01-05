import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Reader } from '@ethersproject/abi/lib/coders/abstract-coder';


import axios from 'axios';
import { ethers } from 'ethers';
import * as FormData from 'form-data';
import { SignerService } from 'src/app/services/signer.service';

@Component({
  selector: 'app-create-nft',
  templateUrl: './create-nft.component.html',
  styleUrls: ['./create-nft.component.css']
})
export class CreateNftComponent implements OnInit {
  createNft: FormGroup;

  address: any
  localContract: any
  photoUrl: any;
  url: any;

  constructor(private signerAddress: SignerService) {
    const signer = this.signerAddress.getsignerAddresss()
    signer.subscribe({
      next: (address: any) => {
        this.address = address.signer
        this.localContract = address.localContract
      }
    })

    this.createNft = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      file: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  selectedImage: any;
  onChange(event: any, keyName: any) {
    console.log(event.target.value)
    if (event.target.files && event.target.files.length) {
      this.selectedImage[keyName] = event.target.files[0];
      this.createNft.value[keyName] = event.target.files[0].name;
      console.log(this.selectedImage);

    }
  }

  pinJSONToIPFS = async (pinataApiKey: string, pinataSecretApiKey: string) => {
    const url = 'https://ipfs.io/ipfs/Qmao7m19yBsXF825FA6QybELj3RPZ9NLLtu3XJEHPGatsT/?filename=tokenURI.json';
    //we gather a local file from the API for this example, but you can gather the file from anywhere
    // let data = new FormData();
    // data.append('file', file);
    console.log("line 60");
    try {
      const response = await axios.get(url,
        {
          headers: {
            'pinata_api_key': pinataApiKey,
            'pinata_secret_api_key': pinataSecretApiKey,
            "Content-Type": 'application/json'
          }
        }
      );
      console.log(response)
      var reader = new FileReader();

      reader.onload = (response) => {
        this.url = response;

        // console.log(());
      }
      reader.readAsDataURL(this.url);
      return response
    } catch (error) {
      console.log(error); //handle error here
    }
    return 
  };

  value: any
  async onSubmit() {

    if (this.createNft.valid) {
      // console.log("line 79",this.createNft.value.file);
      // this.createNft.value.file = 
      // const formData = new FormData();
      // formData.append('file', this.createNft.get('fileSource').value);
      const pinata = await this.pinJSONToIPFS('405cd03c1a778936fc24', 'e1f9b206b09f0b951ed0881139beadde2536fbc8efa0b234751db866053823dc');
      console.log("line 85", pinata);
      // console.log(pinata.data.file);
      const listingPrice = await this.localContract.getListingPrice()
      await this.localContract.createToken(pinata, this.createNft.value.price, { value: ethers.utils.parseUnits(listingPrice.toString(), 'wei') });

    }
  }
  // file:any
  // onFileSelect(input:any) {
  //   if (input.files && input.files[0]) {
  //     this.file=input.files
  //     console.log(this.file);
  //     var reader = new FileReader();
  //     reader.readAsDataURL(input.files[0]);

  //     reader.onload = (e: any) => {
  //       this.photoUrl = e.target.result;
  //       console.log("---------------->",this.photoUrl);

  //     }

  //     // console.log("line 97",input);
  //     // reader.readAsDataURL(input.files[0]);
  //   }
  //   // console.log(reader.readAsDataURL(input.files[0]));
  // }
  onFileSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;

        console.log((event.target));
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  // onFileSelect(event:any){
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.createNft.patchValue({
  //       fileSource: file
  //     });
  //     console.log(this.createNft.patchValue);
  //   }
  // }
  _v() {
    return this.createNft.value
  }

}
