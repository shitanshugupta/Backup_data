import { ChangeDetectorRef, Component, HostListener, OnInit ,AfterViewInit,ViewChild} from '@angular/core';
import { Web3Service } from './service/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit  {
  @ViewChild('keywordsInput') keywordsInput;
  accountNumber: any;
  productName: any;
  productPrice: any;
  show = true;
  totalProduct = [];
  private marketPlace: any;
  balance: any;
  constructor(private web3: Web3Service, private cd: ChangeDetectorRef) {

    this.web3.checkAndInstantiateWeb3()
      .then((checkConn: any) => {
        if (checkConn === 'connected') {
          this.web3.loadBlockChainData()
            .then((accountData: any) => {
              this.accountNumber = accountData[0];
              console.log(this.accountNumber);
              this.web3.getEtherBalance(this.accountNumber)
                .then((data: any) => {
                  this.balance = Number(data).toFixed(2);
                  console.log("-------------------->", data);
                });
                console.log( this.web3.getContract())
              this.web3.getContract().then((contractRes) => {
                if (!contractRes) {
                  this.marketPlace = contractRes;
                  this.marketPlace.methods.productCount()
                    .call()
                    .then((value: number) => {
                      for (let i = 1; i <= value; i++) {
                        const product = this.marketPlace.methods.products(i)
                          .call()
                          .then((products: any) => {
                            this.show = false;
                            this.totalProduct.push(products);
                            this.cd.detectChanges();
                          });
                      }
                      console.log('totalProduct ', this.totalProduct);
                    });
                }
              });
            }, err => {
              console.log('account error', err);
            });
        }
      }, err => {
        alert(err);
      });
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    console.log(this.keywordsInput.nativeElement); // throws an error
  }

   focusKeywordsInput(){
      this.keywordsInput.nativeElement.focus();
   }

  createProducts(name, price) {
    this.show = true;
    const etherPrice = this.web3.convertPriceToEther(price);
    this.marketPlace.methods.createProduct(name, etherPrice)
      .send({ from: this.accountNumber })
      .once('receipt', (receipt) => {
        this.totalProduct.push(receipt.events.ProductCreated.returnValues);
        this.show = false;
      });
  }


  purchaseProducts(id, price) {
    this.show = true;
    this.marketPlace.methods.purchaseProduct(id)
      .send({ from: this.accountNumber, value: price })
      .once('receipt', (receipt) => {
        console.log('receipt ', receipt);
        // this.totalProduct.push(receipt.events.ProductCreated.returnValues);
        this.show = false;
      })
      .on('error', (error) => {
        console.log('receipt ', error);
        this.show = false;
      });

  }

  convertEtherToPrice(price) {
    return this.web3.convertEtherToPrice(price);
  }


  trackByFn(index, item) {
    return item.purchased;
  }
}
