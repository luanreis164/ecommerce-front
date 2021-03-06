import { OrderService } from './../../services/domain/order.service';
import { CustomerService } from './../../services/domain/customer.service';
import { AdressDTO } from './../../models/adress.dto';
import { CustomerDTO } from './../../models/customer.dto';
import { CartService } from './../../services/domain/cart.service';
import { OrderDTO } from './../../models/order.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {
  
  order : OrderDTO;
  cartItems : CartItem[];
  customer : CustomerDTO;
  adress : AdressDTO;
  codorder: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cartService : CartService,
              public customerService : CustomerService,
              public orderService : OrderService,
     ) {
    
    this.order = this.navParams.get('order')
    
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.customerService.findById(this.order.customer.id)
      .subscribe(response => {
          this.customer = response as CustomerDTO;
          this.adress = this.findAdress(this.order.deliveryAdress.id,response['adresses']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      });
  } 

  private findAdress(id: string, list : AdressDTO[]) : AdressDTO{
      let position = list.findIndex(x => x.id == id);
      return list[position];

  }


  total(){
    return this.cartService.total();
  }
  
  back(){
    this.navCtrl.setRoot('CartPage');
  }

  home(){
    this.navCtrl.setRoot('CategoriesPage');
  }

  checkout(){
    this.orderService.insert(this.order)
    .subscribe(response => {
      this.cartService.createOrClearCart();
      this.codorder = this.extractId(response.headers.get('location'));
    },
    error => {
      if(error.status == 403){
        this.navCtrl.setRoot('HomePage');
      }

    })
  }

  private extractId(location : string){
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }

}
