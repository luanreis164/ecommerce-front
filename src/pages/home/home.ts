import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { CredentialsDTO } from '../../models/credentials.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredentialsDTO = {
    email: "",
    password: ""
  };

  constructor(public navCtrl: NavController, public menu: MenuController) {
  }
  
  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  login(){
      console.log(this.creds);
      this.navCtrl.setRoot('CategoriesPage');

  }


}
