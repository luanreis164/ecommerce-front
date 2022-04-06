import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdressDTO } from '../../models/adress.dto';
import { OrderDTO } from '../../models/order.dto';
import { CartService } from '../../services/domain/cart.service';
import { CustomerService } from '../../services/domain/customer.service';
import { StorageService } from '../../services/storage.service';


@IonicPage()
@Component({
  selector: 'page-pick-adress',
  templateUrl: 'pick-adress.html',
})
export class PickAdressPage {

  items : AdressDTO[];

  order : OrderDTO;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: StorageService,
              public customerService : CustomerService,
              public cartService : CartService,
              ) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.customerService.findByEmail(localUser.email)
      .subscribe(response =>{ 
        this.items = response['adresses']; 
        
        let cart = this.cartService.getCart();

        this.order = {
          customer: {id: response['id']},
          deliveryAdress: null,
          payment: null,
          items : cart.items.map(x => { return { amount : x.amount,product:{id: x.product.id}}})
        }
        
      },
        error => {
          if (error.status == 403){
            this.navCtrl.setRoot('HomePage');
          }
        })
    }
    else{
      this.navCtrl.setRoot('HomePage');
    }
  }

  nextPage(item : AdressDTO){
    this.order.deliveryAdress = {id: item.id};
    console.log(this.order);
  }

}
