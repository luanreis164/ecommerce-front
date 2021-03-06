import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { CredentialsDTO } from '../../models/credentials.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isTextFieldType: boolean;

  creds : CredentialsDTO = {
    email: "",
    password: ""
  };

  constructor(public navCtrl: NavController,
              public menu: MenuController,
              public auth: AuthService
     ) {
  }
  
  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  login(){
      this.auth.authenticate(this.creds)
      .subscribe(response => {
          this.auth.successfullLogin(response.headers.get('Authorization'))
          this.navCtrl.setRoot('CategoriesPage');
      },
      error => {});  

  }

  signup(){
    this.navCtrl.push('SignupPage')
  }
  


}
