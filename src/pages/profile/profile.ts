import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CustomerDTO } from '../../models/customer.dto';
import { CustomerService } from '../../services/domain/customer.service';
import { StorageService } from '../../services/storage.service';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  customer : CustomerDTO;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: StorageService,
              public customerService: CustomerService
              ) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.customerService.findByEmail(localUser.email)
      .subscribe(response =>{
        this.customer = response;
        this.getImageIfExists();
      },
        error => {})};
  }

  getImageIfExists(){
    this.customerService.getImageFromBucket(this.customer.id)
      .subscribe(response =>  {
        this.customer.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.customer.id}.jpg`;
      },  
        error => {});
  
  }
    

}
