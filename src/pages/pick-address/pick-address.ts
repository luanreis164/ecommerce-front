import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';


@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items : AddressDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      {
        id:"1",
        address:"Rua Acacio Olivera",
        number:"222",
        complement: null,
        neighborhood:"Vila Esperança",
        postalCode:"11700300",
        city: {
            id:"3",
            name:"Santos",
            state:{
              id:"2",
              name:"São Paulo"
            }
        }
      }, 
      {
        id:"2",
        address:"Rua Jorge",
        number:"222",
        complement: null,
        neighborhood:"Vila Isabel",
        postalCode:"11320030",
        city: {
            id:"3",
            name:"São Vicente",
            state:{
              id:"2",
              name:"São Paulo"
            }
        }
      }

    ]
  }

}
