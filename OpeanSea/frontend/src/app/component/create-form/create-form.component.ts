import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { createReadStream } from 'fs';
import * as FormData from 'form-data';
@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {
  loginForm: FormGroup;
  constructor() {
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      des: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required])
    });
  }


  uploadJSONToIPFS = async (file: any) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    
    let data = new FormData();
    this.loginForm.value.image = "xyzimage"
    console.log(file)
    data.append('file', JSON.stringify(file));
    return axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: "4f2987522860dedbf047",
          pinata_secret_api_key: "6b672d73f85dc4a89aece346c4d42eb36ab011c3a18b605e797f8c4c9fdad93d",
        }
      })
      .then(function (response) {
        const tokenUri=response.data.IpfsHash;// pinata hash of metadata
        // console.log(tokenUri);
        console.log("uploaded", response.data.IpfsHash)
        return {
          success: true,
          pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
        };
      })
      .catch(function (error) {
        console.log(error)
        return {
          success: false,
          message: error.message,
        }

      });
  };
  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this._v());
      // this.loginForm.reset();
      // alert('Nft created succesfully');
      (this.uploadJSONToIPFS(this.loginForm.value))

    }
  }
  _v() {
    return this.loginForm.value;
  }

  ngOnInit(): void {
  }

}
