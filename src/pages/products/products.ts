import { ProductDTO } from './../../models/product.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  items: ProductDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      {
        id:"1",
        name: "Abajour",
        price:120.00
      },
      {
        id:"2",
        name: "Despertador/Porta Retrato digital",
        price:100.00
      }

    ]

  };

}
