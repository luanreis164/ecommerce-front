import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdressDTO } from '../../models/adress.dto';
import { CustomerService } from '../../services/domain/customer.service';
import { StorageService } from '../../services/storage.service';


@IonicPage()
@Component({
  selector: 'page-pick-adress',
  templateUrl: 'pick-adress.html',
})
export class PickAdressPage {

  items : AdressDTO[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: StorageService,
              public customerService : CustomerService,
              ) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.customerService.findByEmail(localUser.email)
      .subscribe(response =>{ 
        this.items = response['adresses'];      
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

}
