import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
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
  picture : string;
  camOn : boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: StorageService,
              public customerService: CustomerService,
              public camera : Camera,
              ) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.customerService.findByEmail(localUser.email)
      .subscribe(response =>{
        this.customer = response as CustomerDTO;
        this.getImageIfExists();
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

  getImageIfExists(){
    this.customerService.getImageFromBucket(this.customer.id)
      .subscribe(response =>  {
        this.customer.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.customer.id}.jpg`;
      },  
        error => {});
  
  }
    
  getCameraPicture(){

    this.camOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.camOn = false;
    }, (err) => {
    
    });
  }

  sendPicture(){
    this.customerService.uploadPicture(this.picture)
    .subscribe(response => {
      this.picture = null;
      this.loadData();
    },
    error => {

    });
  }

  cancel(){
    this.picture = null;
  }

}
