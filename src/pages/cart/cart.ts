import { ProductService } from './../../services/domain/product.service';
import { CartItem } from './../../models/cart-item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';
import { ProductDTO } from '../../models/product.dto';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cartService : CartService,
              public productService: ProductService,
     ) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrl();
  }

  loadImageUrl(){
    for ( var i=0; i<this.items.length;i++){
      let item = this.items[i];
      this.productService.getSmallImageFromBucket(item.product.id)
      .subscribe(response => {
        item.product.imageUrl = `${API_CONFIG.bucketBaseUrl}/p${item.product.id}-small.jpg`;
      },
      error => {});
    }
  }

  removeItem(product : ProductDTO){
    this.items = this.cartService.removeProduct(product).items;
  }

  increaseQuantity(product : ProductDTO){
    this.items = this.cartService.increaseQuantity(product).items;
  }
  
  decreaseQuantity(product : ProductDTO){
    this.items = this.cartService.decreaseQuantity(product).items;
  }

  total() : number {
    return this.cartService.total();
  }

  goOn() {
    this.navCtrl.setRoot('CategoriesPage');
  }

  checkout(){
    this.navCtrl.push('PickAdressPage');
  }

}
